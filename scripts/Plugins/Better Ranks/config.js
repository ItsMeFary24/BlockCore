export const RANK_CONFIG = {
    /**
     * When player does not have any rank, it will called RankList.member rank as the default
     */
    defaultRank: "member",
    AbovePlayerDisplay: {
        member: {
            format: "§l§8{rank_name} §r§7{user_name}",
        },
        owner: {
            format: "§l§c{rank_name} §r§e{user_name}",
        },
    },
    RankList: {
        /**
         * EXPLANATION
         * "default" is the tag name, you need to /tag @s add rank-default to apply
         *
         * "name" is your rank name
         * "format" is how the rank is showed
         * "weight" is the rank weight when applied to other rank, example:
         *          when i have rank "MEMBER" with weight 1, then i have rank "OWNER" with weight 10, the rank "MEMBER" will be ignored and replaced by "OWNER"
         *
         * FORMAT
         * {rank_name} is the rank name, you can use this, ore manualy set the name, but i recommended using {rank_name}
         * {user_name} is the user name of the user
         * {msg} is the message of the user
         */
        member: {
            name: "MEMBER",
            format: "§l§8{rank_name} §r§7{user_name} >> §f{msg}",
            weight: 1,
        },
        owner: {
            name: "OWNER",
            format: "§l§c{rank_name} §r§e{user_name} §f>> {msg}",
            weight: 10,
        },
    },
};
