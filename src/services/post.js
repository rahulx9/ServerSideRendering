import { getRequest } from "../utils/fetchUtils";

export function getPostData() {
    return getRequest("https://jsonplaceholder.typicode.com/posts")
}