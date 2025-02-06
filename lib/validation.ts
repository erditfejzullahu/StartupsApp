import z from 'zod';
export const formSchema = z.object({
    title: z.string({message: "Please add the name of the startup."}).min(3).max(100),
    description: z.string({message: "Please add the startup description."}).min(20).max(500),
    category: z.string( {message: "Please enter a category with 3 to 20 characters."}).min(3).max(20),
    link: z.string( {message: undefined}).url( {message: "Please enter a valid Image URL."}).refine(async (url) => {
        try {
            const res = await fetch(url, {method: "HEAD"})
            const contentType = res.headers.get("content-type")

            return contentType?.startsWith("image/")
        } catch (error) {
            return false;
        }
    }),
    pitch: z.string( {message: "Pitch must be at least 10 characters long."}).min(10)
})