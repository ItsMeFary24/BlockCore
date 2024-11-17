import { ActionFormData, FormCancelationReason, MessageFormData, ModalFormData, } from "@minecraft/server-ui";
import { Player } from "@minecraft/server";
import { World } from "../../Managers/World";
import { Logger } from "../../Systems/Logger";
import { Interval } from "../../Systems/Interval";
/**
 * A class that generates and manages different types of forms for players.
 */
export class FormGenerator {
    form_data;
    /**
     * Sets the form data for the generator.
     * @param { Form[] } form - An array of Form objects to be registered.
     */
    setData(form) {
        const id_map = {};
        const duplicated_id = [];
        let check_idx = form.length;
        while (check_idx--) {
            const frm = form[check_idx];
            if (id_map[frm.id])
                duplicated_id.push(frm.id);
            else
                id_map[frm.id] = true;
        }
        if (duplicated_id.length > 0) {
            Logger.DevMode()?.Danger({
                unit: "FormGenerator",
                location: "setData",
                message: `Multiple IDs found: ${duplicated_id.join(", ")}`,
            });
            return;
        }
        this.form_data = form;
        return this;
    }
    /**
     * Displays a form to the specified player.
     * @param { Player } player - The player to show the form to.
     * @param { number } id - The ID of the form to display.
     * @param { boolean } [waitUntilCloseChat = false] - Whether to wait until the chat is closed before proceeding.
     */
    async show(player, id, waitUntilCloseChat) {
        const form_id = this.form_data?.find((form) => form.id === id);
        if (!form_id)
            return;
        if (form_id.type === "action")
            await this.generateAction(player, form_id, waitUntilCloseChat);
        else if (form_id.type === "modal")
            await this.generateModal(player, form_id, waitUntilCloseChat);
        else if (form_id.type === "message")
            await this.generateMessage(player, form_id, waitUntilCloseChat);
        else if (form_id.type === "player_selector")
            await this.generatePlayerSelector(player, form_id, waitUntilCloseChat);
    }
    /**
     * Generates and displays an action form to the player.
     * @param player - The player to show the form to.
     * @param form_data - The data for the action form.
     * @param waitUntilCloseChat - Whether to wait until the chat is closed before proceeding.
     */
    async generateAction(player, form_data, waitUntilCloseChat) {
        const form = new ActionFormData();
        if (form_data.title)
            form.title(form_data.title);
        if (form_data.body)
            form.body(form_data.body);
        let button_idx = 0;
        while (button_idx < (form_data.content?.buttons.length || 0)) {
            const btn = form_data.content?.buttons[button_idx];
            form.button(btn?.label || "", btn?.icon);
            button_idx++;
        }
        if (waitUntilCloseChat)
            while (true) {
                await Interval.WaitNextTick();
                /** @ts-ignore */
                const response = await form.show(player);
                const button_event = form_data.content?.buttons[response.selection]?.onClick;
                if (response?.cancelationReason !== FormCancelationReason.UserBusy &&
                    (!response.canceled || button_event))
                    return button_event(player);
            }
        else {
            await Interval.WaitNextTick();
            /** @ts-ignore */
            const response = await form.show(player);
            const button_event = form_data.content?.buttons[response.selection]?.onClick;
            if (response.canceled || !button_event)
                return;
            button_event(player);
        }
    }
    /**
     * Generates and displays a modal form to the player.
     * @param player - The player to show the form to.
     * @param form_data - The data for the modal form.
     * @param waitUntilCloseChat - Whether to wait until the chat is closed before proceeding.
     */
    async generateModal(player, form_data, waitUntilCloseChat) {
        const form = new ModalFormData();
        if (form_data.title)
            form.title(form_data.title);
        let content_idx = 0;
        while (content_idx < (form_data.content?.length || 0)) {
            const content = form_data.content?.[content_idx];
            if (content?.dropdown)
                form.dropdown(content.dropdown.label, content.dropdown.data, content.dropdown.defaultDataIndex);
            if (content?.slider)
                form.slider(content.slider.label, content.slider.minValue, content.slider.maxValue, content.slider.step || 1, content.slider.defaultValue);
            if (content?.submitButton)
                form.submitButton(content.submitButton.label);
            if (content?.textField)
                form.textField(content.textField.label, content.textField.placeholder, content.textField.defaultValue);
            if (content?.toggle)
                form.toggle(content.toggle.label, content.toggle.defaultValue);
            content_idx++;
        }
        if (waitUntilCloseChat)
            while (true) {
                await Interval.WaitNextTick();
                /** @ts-ignore */
                const response = await form.show(player);
                if (response?.cancelationReason !== FormCancelationReason.UserBusy &&
                    (!response.canceled || form_data.onSubmit)) {
                    const form_values = {};
                    content_idx = 0;
                    while (content_idx < (response.formValues?.length || 0)) {
                        form_values[content_idx] =
                            response.formValues?.[content_idx] === ""
                                ? undefined
                                : response.formValues?.[content_idx];
                        content_idx++;
                    }
                    return form_data.onSubmit(player, form_values);
                }
            }
        else {
            await Interval.WaitNextTick();
            /** @ts-ignore */
            const response = await form.show(player);
            if (response.canceled || !form_data.onSubmit)
                return;
            const form_values = {};
            content_idx = 0;
            while (content_idx < (response.formValues?.length || 0)) {
                form_values[content_idx] =
                    response.formValues?.[content_idx] === ""
                        ? undefined
                        : response.formValues?.[content_idx];
                content_idx++;
            }
            form_data.onSubmit(player, form_values);
        }
    }
    /**
     * Generates and displays a message form to the player.
     * @param player - The player to show the form to.
     * @param form_data - The data for the message form.
     * @param waitUntilCloseChat - Whether to wait until the chat is closed before proceeding.
     */
    async generateMessage(player, form_data, waitUntilCloseChat) {
        const form = new MessageFormData();
        if (form_data.title)
            form.title(form_data.title);
        if (form_data.body)
            form.body(form_data.body);
        if (form_data.content?.button1)
            form.button1(form_data.content.button1.label);
        if (form_data.content?.button2)
            form.button2(form_data.content.button2.label);
        const buttons = [form_data.content?.button1, form_data.content?.button2];
        if (waitUntilCloseChat)
            while (true) {
                await Interval.WaitNextTick();
                /** @ts-ignore */
                const response = await form.show(player);
                if (response?.cancelationReason !== FormCancelationReason.UserBusy &&
                    !response.canceled) {
                    const selected_buton = buttons[response.selection];
                    if (!selected_buton.onClick)
                        return;
                    return selected_buton.onClick(player);
                }
            }
        else {
            await Interval.WaitNextTick();
            /** @ts-ignore */
            const response = await form.show(player);
            if (response.canceled)
                return;
            const selected_buton = buttons[response.selection];
            if (!selected_buton?.onClick)
                return;
            selected_buton.onClick(player);
        }
    }
    /**
     * Generates and displays a player selector form to the player.
     * @param player - The player to show the form to.
     * @param form_data - The data for the player selector form.
     * @param waitUntilCloseChat - Whether to wait until the chat is closed before proceeding.
     */
    async generatePlayerSelector(player, form_data, waitUntilCloseChat) {
        const form = new ActionFormData();
        if (form_data.title)
            form.title(form_data.title);
        if (form_data.body)
            form.body(form_data.body);
        const online_players = [...World.getOnlinePlayers()].sort((a, b) => a.name.localeCompare(b.name));
        let player_idx = 0;
        while (player_idx < online_players.length) {
            const targetPlayer = online_players[player_idx];
            form.button(targetPlayer.name, form_data.icon);
            player_idx++;
        }
        if (waitUntilCloseChat)
            while (true) {
                await Interval.WaitNextTick();
                /** @ts-ignore */
                const response = await form.show(player);
                if (response?.cancelationReason !== FormCancelationReason.UserBusy &&
                    !response.canceled &&
                    form_data.onSelect)
                    return form_data.onSelect(player, online_players[response.selection]);
            }
        else {
            await Interval.WaitNextTick();
            /** @ts-ignore */
            const response = await form.show(player);
            if (response.canceled || !form_data.onSelect)
                return;
            form_data.onSelect(player, online_players[response.selection]);
        }
    }
}
