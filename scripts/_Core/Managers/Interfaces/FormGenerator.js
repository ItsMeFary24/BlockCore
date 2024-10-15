import { ActionFormData, FormCancelationReason, MessageFormData, ModalFormData, } from "@minecraft/server-ui";
import { World } from "../../Managers/World";
import { Logger } from "../../Systems/Logger";
/**
 * A class that generates and manages different types of forms for players.
 */
export class FormGenerator {
    formData;
    /**
     * Sets the form data for the generator.
     * @param { Form[] } form - An array of Form objects to be registered.
     */
    setData(form) {
        const idMap = {};
        const duplicateIds = [];
        let check_idx = 0;
        while (check_idx < form.length) {
            const f = form[check_idx];
            if (idMap[f.id])
                duplicateIds.push(f.id);
            else
                idMap[f.id] = true;
            check_idx++;
        }
        if (duplicateIds.length > 0) {
            Logger.DevMode()?.Danger({
                unit: "FormGenerator",
                location: "setData",
                message: `Multiple IDs found: ${duplicateIds.join(", ")}`,
            });
            return;
        }
        this.formData = form;
    }
    /**
     * Displays a form to the specified player.
     * @param { Player } player - The player to show the form to.
     * @param { number } id - The ID of the form to display.
     * @param { boolean } [waitUntilCloseChat = false] - Whether to wait until the chat is closed before proceeding.
     */
    async show(player, id, waitUntilCloseChat) {
        const formId = this.formData?.find((form) => form.id === id);
        if (!formId)
            return;
        if (formId.type === "action")
            await this.generateAction(player, formId, waitUntilCloseChat);
        else if (formId.type === "modal")
            await this.generateModal(player, formId, waitUntilCloseChat);
        else if (formId.type === "message")
            await this.generateMessage(player, formId, waitUntilCloseChat);
        else if (formId.type === "player_selector")
            await this.generatePlayerSelector(player, formId, waitUntilCloseChat);
    }
    /**
     * Generates and displays an action form to the player.
     * @param player - The player to show the form to.
     * @param formData - The data for the action form.
     * @param waitUntilCloseChat - Whether to wait until the chat is closed before proceeding.
     */
    async generateAction(player, formData, waitUntilCloseChat) {
        const form = new ActionFormData();
        if (formData.title)
            form.title(formData.title);
        if (formData.body)
            form.body(formData.body);
        let button_idx = 0;
        while (button_idx < (formData.content?.buttons.length || 0)) {
            const btn = formData.content?.buttons[button_idx];
            form.button(btn?.label || "", btn?.icon);
            button_idx++;
        }
        if (waitUntilCloseChat)
            while (true) {
                await null;
                /** @ts-ignore */
                const response = await form.show(player);
                const btnEvent = formData.content?.buttons[response.selection]?.onClick;
                if (response?.cancelationReason !== FormCancelationReason.UserBusy) {
                    if (response.canceled || !btnEvent)
                        return;
                    return btnEvent(player);
                }
            }
        else {
            await null;
            /** @ts-ignore */
            const response = await form.show(player);
            const btnEvent = formData.content?.buttons[response.selection]?.onClick;
            if (response.canceled || !btnEvent)
                return;
            btnEvent(player);
        }
    }
    /**
     * Generates and displays a modal form to the player.
     * @param player - The player to show the form to.
     * @param formData - The data for the modal form.
     * @param waitUntilCloseChat - Whether to wait until the chat is closed before proceeding.
     */
    async generateModal(player, formData, waitUntilCloseChat) {
        const form = new ModalFormData();
        if (formData.title)
            form.title(formData.title);
        let content_idx = 0;
        while (content_idx < (formData.content?.length || 0)) {
            const content = formData.content?.[content_idx];
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
                await null;
                /** @ts-ignore */
                const response = await form.show(player);
                if (response?.cancelationReason !== FormCancelationReason.UserBusy) {
                    if (response.canceled || !formData.onSubmit)
                        return;
                    const formValues = {};
                    content_idx = 0;
                    while (content_idx < (response.formValues?.length || 0)) {
                        formValues[content_idx] =
                            response.formValues?.[content_idx] === ""
                                ? undefined
                                : response.formValues?.[content_idx];
                        content_idx++;
                    }
                    return formData.onSubmit(player, formValues);
                }
            }
        else {
            await null;
            /** @ts-ignore */
            const response = await form.show(player);
            if (response.canceled || !formData.onSubmit)
                return;
            const formValues = {};
            content_idx = 0;
            while (content_idx < (response.formValues?.length || 0)) {
                formValues[content_idx] =
                    response.formValues?.[content_idx] === ""
                        ? undefined
                        : response.formValues?.[content_idx];
                content_idx++;
            }
            formData.onSubmit(player, formValues);
        }
    }
    /**
     * Generates and displays a message form to the player.
     * @param player - The player to show the form to.
     * @param formData - The data for the message form.
     * @param waitUntilCloseChat - Whether to wait until the chat is closed before proceeding.
     */
    async generateMessage(player, formData, waitUntilCloseChat) {
        const form = new MessageFormData();
        if (formData.title)
            form.title(formData.title);
        if (formData.body)
            form.body(formData.body);
        if (formData.content?.button1)
            form.button1(formData.content.button1.label);
        if (formData.content?.button2)
            form.button2(formData.content.button2.label);
        const buttons = [formData.content?.button1, formData.content?.button2];
        if (waitUntilCloseChat)
            while (true) {
                await null;
                /** @ts-ignore */
                const response = await form.show(player);
                if (response?.cancelationReason !== FormCancelationReason.UserBusy) {
                    if (response.canceled)
                        return;
                    const selectedButton = buttons[response.selection];
                    if (!selectedButton.onClick)
                        return;
                    return selectedButton.onClick(player);
                }
            }
        else {
            await null;
            /** @ts-ignore */
            const response = await form.show(player);
            if (response.canceled)
                return;
            const selectedButton = buttons[response.selection];
            if (!selectedButton?.onClick)
                return;
            selectedButton.onClick(player);
        }
    }
    /**
     * Generates and displays a player selector form to the player.
     * @param player - The player to show the form to.
     * @param formData - The data for the player selector form.
     * @param waitUntilCloseChat - Whether to wait until the chat is closed before proceeding.
     */
    async generatePlayerSelector(player, formData, waitUntilCloseChat) {
        const form = new ActionFormData();
        if (formData.title)
            form.title(formData.title);
        if (formData.body)
            form.body(formData.body);
        const onlinePlayers = [...World.getOnlinePlayers()].sort((a, b) => a.name.localeCompare(b.name));
        let player_idx = 0;
        while (player_idx < onlinePlayers.length) {
            const targetPlayer = onlinePlayers[player_idx];
            form.button(targetPlayer.name, formData.icon);
            player_idx++;
        }
        if (waitUntilCloseChat)
            while (true) {
                await null;
                /** @ts-ignore */
                const response = await form.show(player);
                if (response?.cancelationReason !== FormCancelationReason.UserBusy) {
                    if (response.canceled || !formData.onSelect)
                        return;
                    return formData.onSelect(player, onlinePlayers[response.selection]);
                }
            }
        else {
            await null;
            /** @ts-ignore */
            const response = await form.show(player);
            if (response.canceled || !formData.onSelect)
                return;
            formData.onSelect(player, onlinePlayers[response.selection]);
        }
    }
}
