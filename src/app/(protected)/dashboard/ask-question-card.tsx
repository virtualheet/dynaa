'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useProject from '@/hooks/use-projects'
import React, { useState } from 'react'
import { askQuestion } from './action'
import { readStreamableValue } from 'ai/rsc'

export default function AskQuestionCard() {

    const [question, setQuestion] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [fileReferences1, setFileReferences] = React.useState<{fileName: string, sourceCode: string, summary: string}[]>([])   
    const [answer, setAnswer] = React.useState('')
    const { project } = useProject()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!project?.id) return
        setLoading(true)
        setOpen(true)
        

        const {output, filesReferences} = await askQuestion(question, project.id)
        setFileReferences(filesReferences)
        console.log("Files References:", filesReferences)

        for await (const delta of readStreamableValue(output)) {
            if(delta){
                setAnswer(ans => ans + delta)
            }
        }
        setLoading(false)
    }

    return (
        <div className='w-1/2'>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dyna</DialogTitle>
                </DialogHeader>

                {answer}
                <h1>Files References</h1>
                {fileReferences1.map(file => (
                    <span key={file.fileName}>
                        <h3>{file.fileName}</h3>
                        <p>{file.summary}</p>
                    </span>
                ))}
                </DialogContent>
            </Dialog>

            <Card className='relative col-span-3 border-none'>
                <CardHeader>
                    <CardTitle>Ask a question</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <Textarea
                            placeholder='Which file should i edit to change the home page?'
                            className='resize-none  border-2 text-xl focus-visible:border-2 focus-visible:border-white/70 text-white placeholder:text-white/70 border-white/30'
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <div className="h-4"></div>
                        <Button type='submit' className='bg-white text-black'>Ask Dyna{"!"}</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}