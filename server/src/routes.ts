import express from "express"
import {NodemailerMailAdapter} from "./adapters/nodemailer/nodemailer-mail-repository"

import {PrismaFeedbacksRepository} from "./repositories/prisma/prisma-feedbacks-repository"
import {SubmitFeedbackUseCase} from "./use-cases/submit-feedback-use-case"

export const routes = express.Router()

routes.post("/feedbacks", async (req, res) => {
    const {type, comment, screenshot} = req.body

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerAdapter = new NodemailerMailAdapter()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerAdapter)

    try {
        await submitFeedbackUseCase.execute({
            type,
            comment,
            screenshot,
        })

        return res.status(201).send()
    } catch (error) {
        return res.status(400).send()
    }
})
