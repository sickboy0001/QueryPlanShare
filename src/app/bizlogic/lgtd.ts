"use server";

import { useEffect } from "react";
import { insertProject, insertTask, selectAllPorjects, selectTasks } from "../db/lgtd";
import { typeproject } from "../model/lgtd/projects.type";
import { sampleProjects, sampleTasks } from "./SampleDatas";


export const getAllPorjects= async (user_id: string) => {
    return selectAllPorjects(user_id);
    
};

export const  getProjectTasks = async (user_id: string , project_id :number) => {
    // console.log(project_id.toString())
    // console.log(sampleTasks.filter((value)=>value.project_id===project_id))
    return selectTasks(user_id,project_id);
    // return sampleTasks.filter((value)=>value.project_id===project_id);
    // return selectAllProjectTask(user_id);
};

export const  getAllTasks = async (user_id: string) => {
    return sampleTasks;
};

export const addNewProject = async (user_id:string , title:string)=>{
    insertProject(user_id,title)
    return
}
export const addNewTask = async (user_id:string ,project_id:number, title:string)=>{
    insertTask(user_id,project_id,title)

}


const guest_user_id = process.env.NEXT_PUBLIC_GUEST_USER_ID as
  | string
  | undefined;


