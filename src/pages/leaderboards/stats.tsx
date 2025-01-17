import * as React from "react";
import { Card } from "../../common/components/card";
import { Player } from "../../models";
import { Link } from "wouter";

type Props = {
    title: string,
    header?: boolean,
    headerImage?: string,
    rows: {
        player: Player,
        value: string | number, //Record<string, React.ReactNode | string | number | null | undefined>[]
    }[]
}

export function StatsLeaderBoard( { title, rows, header = true, headerImage }: Props ){
    return (
        <div className="basis-1/4 grow">
            <Card>
                <div className="text-center text-xl uppercase font-extrabold m-4">
                    {title}
                    { headerImage && <div className="ml-4 w-24 h-24 mx-auto inline"><img className="inline" src={headerImage} alt="Header" /></div> }
                </div>
                <div className="overflow-hidden overflow-x-auto rounded">
                    <table className="table-auto min-w-full text-sm">
                        { header && 
                            <thead className="text-left underline decoration-yellow-400">
                                <tr>                                
                                    <td>Name</td>
                                    <td>Tier</td>
                                    <td></td>
                                </tr>
                            </thead> 
                        }

                        <tbody>
                        { rows.map( (row,rowIndex) => 
                            rowIndex === 0 ?
                                <tr className={`${rowIndex % 2 === 1 ? "bg-midnight1" : "bg-midnight2"} rounded h-16`}>
                                    <td>                                   
                                        <div className="relative pl-2 font-xl font-bold truncate hover:text-blue-400">
                                            <Link to={`/players/${encodeURIComponent(row.player.name)}`}>
                                            <img className="inline h-12 w-12 rounded-full mr-2" src={row.player.avatarUrl} alt="Discord Avatar" />                                      
                                                {row.player.name}
                                            </Link>
                                        </div>                                                                      
                                    </td>            
                                    <td>{row.player.tier.name}</td>
                                    <td className="font-black">{row.value}</td>                    
                                </tr>

                            :
                                <tr className={`${rowIndex % 2 === 1 ? "bg-midnight1" : "bg-midnight2"} rounded px-4 py-1 font-medium`}>                                
                                    <td className={`whitespace-nowrap pl-2 py-1 font-medium truncate hover:text-blue-400`}><Link to={`/players/${encodeURIComponent(row.player.name)}`}>{row.player.name}</Link></td>
                                    <td className={`whitespace-nowrap py-1 font-medium`}>{row.player.tier.name}</td>
                                    <td className={`whitespace-nowrap py-1 font-medium`}>{row.value}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}