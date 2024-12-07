package travelplanner.backend;

import java.net.URI;
import java.util.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.json.*;

public class LanguageTranslation {

    public static String doTranslation(String text, String source_lang, String dest_lang) {

        String apiToken = "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";

        String apiUrl = "https://api-inference.huggingface.co/models/ai4bharat/indictrans2-indic-indic-1B";

        Map<String, String> languageMap = new HashMap<>();
        languageMap.put("English" , "eng");
        languageMap.put("Hindi", "hin");
        languageMap.put("Bengali", "ben");
        languageMap.put("Tamil", "tam");
        languageMap.put("Telugu", "tel");
        languageMap.put("Kannada", "kan");
        languageMap.put("Malayalam", "mal");
        languageMap.put("Gujarati", "guj");
        languageMap.put("Punjabi", "pan");
        languageMap.put("Marathi", "mar");
        languageMap.put("Oriya", "ori");
        languageMap.put("Urdu", "urd");
        languageMap.put("Assamese", "asm");
        languageMap.put("Konkani", "kon");
        languageMap.put("Maithili", "mai");
        languageMap.put("Nepali", "nep");
        languageMap.put("Sanskrit", "san");
        languageMap.put("Sindhi", "snd");
        languageMap.put("Bodo", "bod");
        languageMap.put("Kashmiri", "kas");
        languageMap.put("Santali", "sat");
        languageMap.put("Hindi (Devanagari)", "hin_Deva");
        languageMap.put("Gujarati (Devanagari)", "guj_Deva");
        languageMap.put("Marathi (Devanagari)", "mar_Deva");
        languageMap.put("Punjabi (Gurmukhi)", "pan_Guru");
        languageMap.put("Bengali (Bangla)", "ben_Beng");

        JSONArray inputSentences = new JSONArray();
        inputSentences.put(text);
        JSONObject payload = new JSONObject();
        payload.put("inputs", inputSentences);
        payload.put("source_lang", languageMap.getOrDefault(source_lang, "en"));  // Specify the source language
        payload.put("target_lang", languageMap.getOrDefault(dest_lang, "tam"));    // Specify the target language
        StringBuilder sb = new StringBuilder("");
        try {

            HttpClient client = HttpClient.newHttpClient();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Authorization", "Bearer " + apiToken)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(payload.toString()))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JSONArray translations = new JSONArray(response.body());
                for (int i = 0; i < inputSentences.length(); i++) {
                    System.out.println("Input Sentence: " + inputSentences.getString(i));
                    sb.append(translations.getString(i));
                    System.out.println("Translation: " + translations.getString(i));
                    System.out.println();
                }
            } else {
                // Handle errors
                System.out.println("Error: " + response.statusCode());
                System.out.println(response.body());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return sb.toString() + "Done";
    }

    // Example usage of the translation function
    public static void main(String[] args) {
        LanguageTranslation translator = new LanguageTranslation();

        // Example text and language codes
        String text = "मैं स्कूल जा रहा हूँ।";  // Input text (e.g., Hindi)
        String sourceLang = "hin";  // Source language code (e.g., "hin" for Hindi)
        String targetLang = "ben";  // Target language code (e.g., "ben" for Bengali)

        // Perform translation
        translator.doTranslation(text, sourceLang, targetLang);
    }
}
