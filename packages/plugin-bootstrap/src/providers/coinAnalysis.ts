import type { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import * as fs from "fs";

const coinAnalysisProvider: Provider = {
    get: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
        // 1. Extract Coin and Analysis Type from Message
        const coin = message.content.text.split(":")[1].trim().split(" - ")[0]; // Extract coin name
        const analysisType = message.content.text.split("-")[1].trim(); // Extract analysis type

        // 2. Load the JSON Data (Replace with your actual data source)
        const rawData = fs.readFileSync(
            "../../../summaries/coinLevelSummary.json",
            "utf-8"
        ); // Replace with your file path
        const summaries = JSON.parse(rawData);

        // 3. Find the Coin Data
        const coinData = summaries.coins.find((c: any) => c.coin === coin);

        if (!coinData) {
            return `No data found for ${coin}.`; // Handle case where coin data is missing
        }

        // 4. Format the Analysis Summary (Customize as needed)
        let analysisSummary = "";
        switch (analysisType) {
            case "sentiment":
                analysisSummary = `Overall Sentiment: ${coinData.trader_sentiment.sentiment_summary.bullish_thesis}\\nBearish: ${coinData.trader_sentiment.sentiment_summary.bearish_thesis}\\nNeutral: ${coinData.trader_sentiment.sentiment_summary.neutral_thesis}`;
                break;
            case "technical":
                analysisSummary = `Key Levels: ${coinData.technical_analysis.key_levels.levels_context}`;
                break;
            case "onchain":
                analysisSummary = `On-Chain Summary: ${coinData.on_chain.onchain_summary}`;
                break;
            default:
                analysisSummary = `Invalid analysis type specified.`;
        }

        // 5. Return the Formatted Summary
        return `Coin: ${coin}\\nAnalysis Type: ${analysisType}\\n${analysisSummary}`;
    },
};

export { coinAnalysisProvider };
