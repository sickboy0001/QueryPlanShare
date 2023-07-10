import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient<Database>({ cookies });


export const selectAllPorjects = async(user_id: string)=>{
    const result = await supabase.from("projects").select("*")
        .eq("user_id",user_id)
        .order('created_at',  {ascending: true });
    return result.data;
}

export const selectTasks= async(user_id: string,project_id:number)=>{
    const result = await supabase.from("tasks").select("*")
        .eq("user_id",user_id)
        .eq("project_id",project_id)
        .order('created_at',  {ascending: true });
    return result.data;
}

export const insertProject = async(user_id:string , title:string)=>{
    // const localDate = new Date(cur_date.toLocaleString());
    console.log(`insertProject = async(user_id:${user_id} contents:${title})`)
    const { data, error } = await supabase
        .from('projects')
        .insert([
            { user_id: user_id ,title: title},
        ])
    }

    export const insertTask = async(user_id:string ,project_id:number, title:string | null)=>{
        // const localDate = new Date(cur_date.toLocaleString());
        console.log(`insertTask = async(user_id:${user_id} contents:${title})`)
        const { data, error } = await supabase
          .from('tasks')
          .insert([
            { user_id: user_id ,project_id: project_id ,title: title}
          ])
      }
    
//     if (error) {
//     // refresh tokenが無効な場合、エラーをログに記録し、ユーザーにログインしてもらうよう促します。
//         console.error(error);
//         alert("ログインしてください。");
//     } else {
//         return {data,error}
//     }
// }

// export const updateGoodThingThing=async (id:number , thing :Text)=>{
//     console.log(`updateGoodThingThing:${id}:${thing}`)
//     //2023-05-22 07:16:40.904367+09
//     console.log(new Date().toString())
    
//     const { data, error } = await supabase
//     .from('three_good_things')
//     .update(
//             { contents: String(thing), updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}
//             )
//         .eq
//         ( "id", id )
//     if(error!==null){
//         console.log(error)

//     }
//     return {data,error}
    
// }
// export const updateGoodThingArchived = async(id:number)=>{
//     console.log(`updateGoodThingArchived:${id}`)
//     const { data, error } = await supabase
//     .from('three_good_things')
//     .update(
//             { is_archived: true, updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}
//             )
//         .eq
//         ( "id", id )

//     return {data,error}
// }

