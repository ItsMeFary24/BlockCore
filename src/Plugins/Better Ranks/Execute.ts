import { world } from "@minecraft/server";
import { BeforeEvents, Interval } from "../block-core";
import { RANK_CONFIG } from "./config";
import { BLOCK_CORE_CONFIGURATION } from "../../config";

interface IRank {
  name: string;
  format: string;
  weight: number;
}

const rankConfig: {
  AbovePlayerDisplay: Record<string, { format: string }>;
  RankList: Record<string, IRank>;
} = RANK_CONFIG;

BeforeEvents.on("msg_send", (params) => {
  const prefix_matcher = BLOCK_CORE_CONFIGURATION.custom_command_prefixes.find(
    (prefix) => params.message.startsWith(prefix),
  );

  if (prefix_matcher && BLOCK_CORE_CONFIGURATION.enable_custom_command) return;

  params.cancel = true;

  const tags = params.sender
    .getTags()
    .filter((tag) => tag.startsWith("rank-"))
    .flatMap((tag) => tag.split("rank-")[1]);

  const highestRank = tags.reduce<IRank | null>((highest, tag) => {
    const rank = rankConfig.RankList[tag];
    return rank && rank.weight > (highest?.weight || 0) ? rank : highest;
  }, rankConfig.RankList[RANK_CONFIG.defaultRank]);

  return world.sendMessage(
    highestRank.format
      .replaceAll("{rank_name}", highestRank.name)
      .replaceAll("{user_name}", params.sender.name)
      .replaceAll("{msg}", params.message),
  );
});

Interval.Always(() => {
  const allPlayer = [...world.getAllPlayers()];

  let entity_idx = 0;
  while (entity_idx < allPlayer.length) {
    const player = allPlayer[entity_idx];

    const tags = player
      .getTags()
      .filter((tag) => tag.startsWith("rank-"))
      .flatMap((tag) => tag.split("rank-")[1]);

    const highestRank = tags.reduce<IRank | null>((highest, tag) => {
      const rank = rankConfig.RankList[tag];
      return rank && rank.weight > (highest?.weight || 0) ? rank : highest;
    }, rankConfig.RankList[RANK_CONFIG.defaultRank]);

    player.nameTag = `${rankConfig.AbovePlayerDisplay[
      highestRank.name.toLocaleLowerCase()
    ].format
      .replaceAll("{rank_name}", highestRank.name)
      .replaceAll("{user_name}", player.name)}`;

    entity_idx++;
  }
});
