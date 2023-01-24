import * as React from "react";
import { Container } from "../common/components/container";
import { Input } from "../common/components/input";
import { useDataContext } from "../DataContext";
import { PlayerMappings } from "./player-utils";
import { Player } from "../models";
import { Loading } from "../common/components/loading";

export function TeamBuilder() {
    const [ searchValue, setSearchValue ] = React.useState<string>("");
    const [ squad, setSquad ] = React.useState<Player[]>([]);
    const { season10CombinePlayers = [], isLoading } = useDataContext();
    const players = season10CombinePlayers;
    const searchParams = new URLSearchParams(window.location.search);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = searchParams.get("players");

    // for (const [key, value] of searchParams.entries()) {
    //     console.log(`${key}, ${value}`);
    //     //players.find( p => )
    //  }

    function remove( index: number){
        const newSquad = squad;
        delete squad[index];
        console.info(index, newSquad);
        setSquad( newSquad.filter(Boolean) );
    }

    const gridData: { prop: string, data: (string | number | null)[]}[] = React.useMemo( () => {
        const gd = [];
        const playerProps = Object.keys(PlayerMappings);
        for( let i = 0; i < Object.keys(PlayerMappings).length; i++){
            const prop = playerProps[i];
            const stat = squad.map( member => member[prop as keyof Player]);  
            gd.push( {prop: prop, data: [...stat]})
        }
        return gd;
    }, [ squad ]);

    const gridClassName = `grid grid-cols-${squad.length+1} gap-2`;
    //const statFirst = []
    const statExclusionList = ["","Name","Steam","GP","ADP","ctADP","tADP","Xdiff","1v1","Rounds"];

    console.info( "gridData",gridData );

    if( isLoading ){
        return <Container><Loading /></Container>
    }

    return (
        <Container>
            <h2 className="text-3xl font-bold sm:text-4xl">Team Builder</h2>
            <p className="mt-4 text-gray-300">
            Find players, view stats, see how you stack up against your peers.
            </p>
            <div>

            </div>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-800" />
            <div>
                <form className="flex flex-box h-12 mx-auto" onSubmit={(e)=>{e.preventDefault()}}>
                    <Input
                        className="basis-1/2 grow"
                        label="Filter"
                        placeHolder="Player Name"
                        type="text"
                        onChange={ ( e ) => setSearchValue(e.currentTarget.value)}
                        value={searchValue}
                    />
                </form>
            </div>
            <div>
                {
                    players.filter( p => p.Name.toLowerCase().includes(searchValue.toLowerCase()) && searchValue !== "").slice(0,8).map( p =>
                        <button key={`player-${p.Name}`} className="m-1 p-2" onClick={() => setSquad( (prev: Player[]) => [...prev!, p])}>
                            {p.Name}
                        </button>
                        )
                }
            </div>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-800" />
            <div className="pt-24 sticky z-1">
                <div className={`${gridClassName}`}>
                        { gridData.filter( i => ["Name"].includes(i.prop)).map( (row) =>
                            <>
                                <div key={row.prop}>{row.prop}</div>
                                { row.data.map( (value, index) =>
                                     <div key={`val-${index}`} className={` -rotate-45 -translate-y-20 -translate-x-4 m-2 `}><button onClick={() => remove(index)}>{value ?? "n/a"}</button></div>
                                )}
                            </>
                        )}
                        { gridData.filter( i => !statExclusionList.includes(i.prop)).map( (row, rowIndex) =>
                            <>
                                <div key={row.prop} className={`${rowIndex % 2 ? "bg-slate-800" : ""} p-2`}>{PlayerMappings[row.prop]}</div>
                                { row.data.map( (value, index) =>
                                     <div key={`val-${index}`} className={`${rowIndex % 2 ? "bg-slate-800" : ""} p-2`}>{value ?? "n/a"}</div>
                                )}
                            </>
                        )}
                </div>
            </div>
        </Container>
    );
}