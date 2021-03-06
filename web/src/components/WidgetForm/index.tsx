import {useState} from "react"

import bugImageUrl from "../../assets/Bug.svg"
import ideaImageUrl from "../../assets/Idea.svg"
import thoughtImageUrl from "../../assets/Thought.svg"
import {FeedbackContentStep} from "./FeedbackContentStep"
import {FeedbackSuccessStep} from "./FeedbackSuccessStep"
import {FeedbackTypeStep} from "./FeedbackTypeStep"

export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImageUrl,
            alt: "Imagem de um inseto",
        },
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: ideaImageUrl,
            alt: "Imagem de uma lâmpada",
        },
    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoughtImageUrl,
            alt: "Imagem de um balão de pensamento",
        },
    },
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback() {
        setFeedbackSent(false)
        setFeedbackType(null)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {!feedbackSent && !feedbackType && <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />}
            {!feedbackSent && feedbackType && (
                <FeedbackContentStep
                    feedbackType={feedbackType}
                    onFeedbackRestartRequested={handleRestartFeedback}
                    onFeedbackSent={() => setFeedbackSent(true)}
                />
            )}
            {feedbackSent && <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />}
            <footer className="text-xs text-neutral-400">
                Feito com 💛 pelo{" "}
                <a className="underline underline-offset-2" href="https://mono.direct/ebdonato">
                    ebdonato
                </a>
            </footer>
        </div>
    )
}
