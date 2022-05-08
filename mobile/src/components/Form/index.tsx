import React, {useState} from "react"
import {View, TextInput, Image, Text, TouchableOpacity} from "react-native"
import * as FileSystem from "expo-file-system"
import {captureScreen} from "react-native-view-shot"
import {ArrowLeft} from "phosphor-react-native"
import {theme} from "../../theme"
import {feedbackTypes} from "../../utils/feedbackTypes"
import {Button} from "../Button"
import {ScreenshotButton} from "../ScreenshotButton"
import {FeedbackType} from "../Widget"

import {styles} from "./styles"
import {api} from "../../libs/api"

interface Props {
    feedbackType: FeedbackType
    onFeedbackCanceled: () => void
    onFeedbackSent: () => void
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent}: Props) {
    const feedbackTypeInfo = feedbackTypes[feedbackType]
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    const [comment, setComment] = useState("")

    function handleScreenshot() {
        captureScreen({
            format: "jpg",
            quality: 0.8,
        })
            .then(setScreenshot)
            .catch(console.error)
    }

    function handleScreenshotRemove() {
        setScreenshot(null)
    }

    async function handleSendFeedback() {
        if (isSendingFeedback) {
            return
        }

        setIsSendingFeedback(true)

        const screenShotBase64 = screenshot && (await FileSystem.readAsStringAsync(screenshot, {encoding: "base64"}))

        try {
            await api.post("/feedbacks", {
                type: feedbackType,
                screenshot: screenshot ? `data:image/png;base64, ${screenShotBase64}` : null,
                comment,
            })

            onFeedbackSent()
        } catch (error) {
            console.error(error)
            setIsSendingFeedback(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft size={24} weight="bold" color={theme.colors.text_secondary} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Image source={feedbackTypeInfo.image} style={styles.image} />
                    <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
                </View>
            </View>

            <TextInput
                style={styles.input}
                multiline
                placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
                placeholderTextColor={theme.colors.text_secondary}
                onChangeText={setComment}
            />

            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                />
                <Button isLoading={isSendingFeedback} onPress={handleSendFeedback} />
            </View>
        </View>
    )
}
