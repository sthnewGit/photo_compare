import {Plugins } from "@capacitor/core";

const {Storage} = Plugins;

export async function set(key: string, value: any): Promise<void> {
    await Storage.set({
        key: key,
        value: value
    })
}

export async function get(key: string): Promise<any> {
    const value = await Storage.get({ key: key});
    return value;
}

export async function remove(key: string): Promise<void> {
    await Storage.remove({
        key: key
    });
}