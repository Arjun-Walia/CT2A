// import {
//     Action,
//     IAgentRuntime,
//     Memory,
//     ServiceType,
//     TwitterService,
//     ModelClass,
//     Provider, // Import the Provider interface
//     Content,
//     ITextGenerationService, // Import the TextGenerationService interface
// } from "@elizaos/core";
// import { composeContext } from "@elizaos/core";

// export const generateTweetAction: Action = {
//     name: "GENERATE_TWEET",
//     similes: ["CREATE_TWEET"],
//     description:
//         "Generates a tweet based on the latest market summary and key tweets",
//     validate: async (runtime: IAgentRuntime, message: Memory) => {
//         return true;
//     },
//     handler: async (runtime: IAgentRuntime, message: Memory) => {
//         try {
//             const state = await runtime.composeState(message, {
//                 additionalContext: "tweetAnalysisProvider",
//             });

//             const context = composeContext({
//                 state,
//                 template:
//                     runtime.character.templates?.marketSummaryTemplate ||
//                     "Default Market Summary Template", // Use a default template if none is defined
//             });

//             const tweet = await (
//                 runtime.getService<ITextGenerationService>(
//                     ServiceType.TEXT_GENERATION
//                 ) as ITextGenerationService
//             ) // Type assertion
//                 .queueTextCompletion(
//                     context,
//                     runtime.character.settings?.modelConfig?.temperature || 0.1, // Use a default temperature if not defined
//                     [], // Add stop sequences if needed
//                     runtime.character.settings?.modelConfig
//                         ?.frequency_penalty || 0,
//                     runtime.character.settings?.modelConfig?.presence_penalty ||
//                         0,
//                     runtime.character.settings?.modelConfig?.maxOutputTokens ||
//                         200 // Use a default max_tokens if not defined
//                 );

//             await runtime
//                 .getService<TwitterService>(ServiceType.TWITTER)
//                 .post(tweet);
//         } catch (error) {
//             console.error(`Error generating and posting tweet:`, error);
//         }
//         return true; // Indicate that the action completed successfully
//     },
//     examples: [],
// };

// export const CoinTweetAction: Action = {
//     name: "TWEET_COIN_ANALYSIS",
//     similes: ["POST_COIN_UPDATE"],
//     description: "Generates a tweet based on coin-specific analysis",
//     validate: async (runtime: IAgentRuntime, message: Memory) => {
//         return true;
//     },
//     handler: async (runtime: IAgentRuntime, message: Memory) => {
//         const coinDataString = (await runtime.getService(
//             ServiceType.COIN_SUMMARY_PROVIDER
//         )) as unknown as Provider;

//         // Call the get method on the service to retrieve the data
//         const coinData = JSON.parse(await coinDataString.get(runtime, message));

//         for (const coin of coinData) {
//             try {
//                 const state = await runtime.composeState(
//                     {
//                         ...coin, // Pass coin data as message
//                         content: {
//                             text: `Coin Analysis: ${coin.coin} - sentiment`,
//                         } as Content, // Add a content property
//                     },
//                     {
//                         additionalContext: "coinAnalysisProvider", // Assuming you'll create this provider
//                     }
//                 );

//                 const context = composeContext({
//                     state,
//                     template:
//                         runtime.character.templates?.coinAnalysisTemplate ||
//                         "Default Coin Analysis Template", // Use a default template if none is defined
//                 });

//                 const tweet = await (
//                     runtime.getService<ITextGenerationService>(
//                         ServiceType.TEXT_GENERATION
//                     ) as ITextGenerationService
//                 ) // Type assertion
//                     .queueTextCompletion(
//                         context,
//                         runtime.character.settings?.modelConfig?.temperature ||
//                             0.1, // Use a default temperature if not defined
//                         [], // Add stop sequences if needed
//                         runtime.character.settings?.modelConfig
//                             ?.frequency_penalty || 0,
//                         runtime.character.settings?.modelConfig
//                             ?.presence_penalty || 0,
//                         runtime.character.settings?.modelConfig
//                             ?.maxOutputTokens || 200 // Use a default max_tokens if not defined
//                     );

//                 await runtime
//                     .getService<TwitterService>(ServiceType.TWITTER)
//                     .post(tweet);
//             } catch (error) {
//                 console.error(
//                     `Error generating and posting coin tweet:`,
//                     error
//                 );
//             }
//         }
//     },
//     examples: [],
// };
