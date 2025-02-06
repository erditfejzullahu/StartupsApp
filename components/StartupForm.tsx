"use client";
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from "@uiw/react-md-editor"
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { useActionState } from 'react';
import { formSchema } from '@/lib/validation';
import z from "zod";
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { createPitch } from '@/lib/actions';
const StartupForm = () => {
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState('')
    const {toast} = useToast();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        console.log('? ??? ?? ');
        
        try {
            const formValues = {
                title: formData.get("title"),
                description: formData.get("description"),
                category: formData.get("category"),
                link: formData.get("link"),
                pitch
            }
            console.log(formData);
            await formSchema.parseAsync(formValues);

            const result = await createPitch(prevState, formData, pitch)
            if(result.status === "SUCESS"){
                toast({
                    title: "Sucess",
                    description: "Your startup pitch has been created sucessfully",
                })
            }
            router.push(`/startup/${result._id}`)
            return result;
            
        } catch (error) {            
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>)
                toast({
                    title: "Error",
                    description: "Please check your inputs and try again",
                    variant: "destructive"
                })
                return { ...prevState, error: "Validation failed", status: "ERROR"}
            }
            toast({
                title: "Error",
                description: "Please check your inputs and try again",
                variant: "destructive"
            })
            return {
                ...prevState,
                error: "An unexcpected error has occurred",
                status: "ERROR"
            }
        } 
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: "", status: "INITIAL"});
    

  return (
    <form action={formAction} className="startup-form">
        <div>
            <label htmlFor="title" className="startup-form_label">Title</label>
            <Input id='title' name='title' className="startup-form_input" placeholder='Startup Title'/>

            {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>
        <div>
            <label htmlFor="description" className="startup-form_label">Description</label>
            <Textarea id='description' name='description' className="startup-form_textarea" placeholder='Startup Description'/>

            {errors.description && <p className="startup-form_error">{errors.description}</p>}
        </div>
        <div>
            <label htmlFor="category" className="startup-form_label">Category</label>
            <Input id='category' name='category' className="startup-form_input" placeholder='Tech, Health, Education...'/>

            {errors.category && <p className="startup-form_error">{errors.category}</p>}
        </div>
        <div>
            <label htmlFor="link" className="startup-form_label">Image URL</label>
            <Input id='link' name='link' className="startup-form_input" placeholder='Startup Image URL'/>

            {errors.link && <p className="startup-form_error">{errors.link}</p>}
        </div>

        <div data-color-mode="light">
            <label htmlFor="pitch" className="startup-form_label">Pitch</label>
            <MDEditor 
                value={pitch}
                onChange={(e) => setPitch(e as string)}
                id='pitch'
                preview='edit'
                height={300}
                style={{borderRadius: 20, overflow: "hidden"}}
                textareaProps={{
                    placeholder: "Describe your startup idea or functionality."
                }}
                previewOptions={{
                    // disallowedElements: ["style"]
                }}
            />

            {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
        </div>
        <Button type='submit' className="startup-form_btn" disabled={isPending}>
            {isPending ? "Submitting your pitch" : "Submit your pitch"}
                <Send className="size-6 ml-2"/>
        </Button>
    </form>
  )
}

export default StartupForm