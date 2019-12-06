import React, { Component } from "react"
import ChatBot from "react-simple-chatbot"
import { ThemeProvider } from "styled-components"

const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#34485e",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#34485e",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
};


export default class Chatbot extends Component {
    render() {
        return (
            <ThemeProvider
                recognitionEnable={true}
                theme={theme}
            >
                {
                    this.props.chatBoxVisibale &&
                    <ChatBot
                        width="350px"
                        className="chatbot"
                        steps={[{
                            id: "1",
                            message: "Hi :)",
                            trigger: "2"
                        }, {
                            id: "2",
                            message: "What do you want to buy?",
                            trigger: "3"
                        }, {
                            id: "3",
                            user: true,
                            validator: (value) => {
                                this.props.setProduct(value)
                                return true
                            },
                            trigger: "4"
                        }, {
                            id: "4",
                            message: "Oh nice choice! What is your starting price?",
                            trigger: "5"
                        }, {
                            id: "5",
                            user: true,
                            validator: (value) => {
                                this.props.setStartValue(value)
                                return true
                            },
                            trigger: "6"
                        }, {
                            id: "6",
                            message: "Oh nice choice! What is your max price?",
                            trigger: "7"
                        }, {
                            id: "7",
                            user: true,
                            validator: (value) => {
                                this.props.setEndValue(value)
                                return true
                            },
                            trigger: "8"
                        }, {
                            id: "8",
                            message: "Include Used products?",
                            trigger: "9"
                        }, {
                            id: "9",
                            options: [
                                {
                                    value: 1,
                                    label: 'Yes',
                                    trigger: () => {
                                        this.props.handleIncludeUsedItems()
                                        return 10
                                    }
                                },
                                {
                                    value: 3,
                                    label: 'No',
                                    trigger: () => {
                                        this.props.handleRejectUsedItems()
                                        return 10
                                    }
                                },
                            ],
                        }, {
                            id: "10",
                            message: "Okay great!!",
                            end: true
                        }]}
                    />
                }
            </ThemeProvider>
        )
    }
}
