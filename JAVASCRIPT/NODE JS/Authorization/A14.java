import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class RestApiTest {

    static String baseURL = "http://localhost:3000/students";

    public static void main(String[] args) {

        try {

            // GET request
            System.out.println("===== GET REQUEST =====");
            sendRequest("GET", baseURL, null);

            // POST request
            System.out.println("\n===== POST REQUEST =====");

            String postData =
                    "{\"name\":\"Karishma\",\"age\":19,\"course\":\"Data Science\"}";

            sendRequest("POST", baseURL, postData);

            // PUT request
            System.out.println("\n===== PUT REQUEST =====");

            String putData =
                    "{\"name\":\"Karishma Shaik\",\"age\":20,\"course\":\"AI\"}";

            sendRequest("PUT", baseURL + "/1", putData);

            // DELETE request
            System.out.println("\n===== DELETE REQUEST =====");

            sendRequest("DELETE", baseURL + "/1", null);

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());

        }
    }

    static void sendRequest(String method, String urlString, String data)
            throws Exception {

        URL url = new URL(urlString);

        HttpURLConnection connection =
                (HttpURLConnection) url.openConnection();

        connection.setRequestMethod(method);

        connection.setRequestProperty(
                "Content-Type",
                "application/json"
        );

        // POST and PUT send data
        if (method.equals("POST") || method.equals("PUT")) {

            connection.setDoOutput(true);

            OutputStream outputStream =
                    connection.getOutputStream();

            outputStream.write(data.getBytes());

            outputStream.flush();
            outputStream.close();
        }

        // Get response code
        int responseCode =
                connection.getResponseCode();

        System.out.println("Status Code: " + responseCode);

        // Read response
        BufferedReader reader =
                new BufferedReader(
                        new InputStreamReader(
                                connection.getInputStream()
                        )
                );

        String line;
        StringBuilder response =
                new StringBuilder();

        while ((line = reader.readLine()) != null) {

            response.append(line);
        }

        reader.close();

        System.out.println("Response: " + response.toString());

        connection.disconnect();
    }
}