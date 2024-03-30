import { useQuery } from "@tanstack/react-query"
import axios from 'axios';
import { useState } from "react";
import DisplaySet from "./DisplaySet";


export default function DisplaySets({ sets, refetch }) {
    return (
        <div>
            <div className="row mt-2">
                <div className="col-3">
                    <label className="text-secondary ">Reps</label>
                </div>
                <div className="col-3">
                    <label className="text-secondary ">Stimulation</label>
                </div>
                <div className="col-3">
                    <label className="text-secondary ">RPE</label>
                </div>
                <div className="col-3">
                </div>
            </div>
            {sets.map(set => {
                return <DisplaySet setData={set} key={set.uid} refetch={refetch}/>
            })}

        </div>
    )
}