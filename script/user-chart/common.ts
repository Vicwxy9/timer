import { findTarget, Gist } from "@api/gist"
import { Browser } from "./argv"

/**
 * Calculate the gist description of target browser
 */
export function descriptionOf(browser: Browser): string {
    return `Timer_UserCount_4_${browser}`
}

/**
 * Calculate the gist filename of target browser
 */
export function filenameOf(browser: Browser): string {
    return descriptionOf(browser) + '.json'
}

export async function getExistGist(token: string, browser: Browser): Promise<Gist> {
    return await findTarget(token, gist => gist.description === descriptionOf(browser))
}