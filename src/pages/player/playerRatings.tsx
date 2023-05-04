import * as React from "react";
import { PlayerStats } from "../../models";
import { useDataContext } from "../../DataContext";
import { TotalPlayerAverages } from "../../common/utils/player-utils";

type Props = {
    player: PlayerStats
}

export function PlayerRatings({ player }: Props) {
    const { players = [] } = useDataContext();
    const playerStats: PlayerStats[] = players.filter( p => Boolean(p.stats) ).map( p => p.stats) as PlayerStats[];
    const {Pit, Peak, Rating, Form, "CONCY": ratingConsistency } = player;
    const tierPlayerAverages = TotalPlayerAverages( playerStats, { tier: player?.Tier} );

    const backgroundGradient = "bg-gradient-to-r from-red-500 from-0% via-amber-500 via-10% to-green-500 to-80%";

    return (
        <div className="m-4">
            <div className={`flex flex-row rounded-xl border-2 border-slate-600 justify-between text-center ${backgroundGradient}`}>
                <div className="basis-1/4 p-1 rounded-xl">Pit {Pit}</div>
                <div className="p-1">Rating {Rating.toFixed(2)} {Form > Rating ? "↑" : "↓"}</div>
                <div className="basis-1/4 p-1 rounded-xl">Peak {Peak}</div>
            </div>
            <div className="text-center text-xs">Consistency: {ratingConsistency}σ ({ratingConsistency < tierPlayerAverages.average.ratingConsistency ? "Better" : "Worse"} than {tierPlayerAverages.average.ratingConsistency} avg in Tier)</div>
            <div className="text-center text-xs">Trending {Form > Rating ? "Up" : "Down"} in last 3 games</div>
        </div>
    );
}