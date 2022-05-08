import {SubmitFeedbackUseCase} from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase({create: createFeedbackSpy}, {sendMail: sendMailSpy})

describe("Submit feedback", () => {
    it("should be able to submit a feedback", async () => {
        await expect(
            submitFeedback.execute({
                type: "some_type",
                comment: "some_comment",
                screenshot: "data:image/png;base64,some_image",
            })
        ).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it("should not be able to submit a feedback without type", async () => {
        await expect(
            submitFeedback.execute({
                type: "",
                comment: "some_comment",
                screenshot: "data:image/png;base64,some_image",
            })
        ).rejects.toThrow()
    })

    it("should not be able to submit a feedback without comment", async () => {
        await expect(
            submitFeedback.execute({
                type: "some_type",
                comment: "",
                screenshot: "data:image/png;base64,some_image",
            })
        ).rejects.toThrow()
    })

    it("should not be able to submit a feedback with invalid screenshot", async () => {
        await expect(
            submitFeedback.execute({
                type: "some_type",
                comment: "some_comment",
                screenshot: "invalid_screenshot",
            })
        ).rejects.toThrow()
    })
})
