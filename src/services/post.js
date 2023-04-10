import { getRequest } from "../utils/fetchUtils.js";

export function getPostData() {
    return getRequest("https://jsonplaceholder.typicode.com/posts")
}