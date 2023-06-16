import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const moment = require("moment");
const supabase = createServerComponentClient<Database>({ cookies });


export const selectAllGoodThings = async(user_id: any)=>{
    const todos = await supabase.from("three_good_things").select("*")
    .eq("user_id",user_id)
    .order('created_at',  {ascending: true });
    return todos.data;
}


export const insertGoodThing = async(user_id: any,cur_date:Date,contents:string)=>{
    // const localDate = new Date(cur_date.toLocaleString());
    console.log(`insertGoodThing = async(user_id:${user_id} contents:${contents})`)
    const { data, error } = await supabase
        .from('three_good_things')
        .insert([
            { user_id: user_id ,contents: contents, cur_date:moment(cur_date).format('YYYY-MM-DD HH:mm:ss')},
        ])

    if (error) {
    // refresh tokenが無効な場合、エラーをログに記録し、ユーザーにログインしてもらうよう促します。
        console.error(error);
        alert("ログインしてください。");
    } else {
        return {data,error}
    }
}

export const updateGoodThingThing=async (id:number , thing :Text)=>{
    console.log(`updateGoodThingThing:${id}:${thing}`)
    //2023-05-22 07:16:40.904367+09
    console.log(new Date().toString())
    
    const { data, error } = await supabase
    .from('three_good_things')
    .update(
            { contents: String(thing), updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}
            )
        .eq
        ( "id", id )
    if(error!==null){
        console.log(error)

    }
    return {data,error}
    
}
export const updateGoodThingArchived = async(id:number)=>{
    console.log(`updateGoodThingArchived:${id}`)
    const { data, error } = await supabase
    .from('three_good_things')
    .update(
            { is_archived: true, updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}
            )
        .eq
        ( "id", id )

    return {data,error}
}

