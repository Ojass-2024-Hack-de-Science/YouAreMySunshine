/*
 * Copyright 1996-2023 Cyberbotics Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Description:   Example of a traffic light system in crossroads.
 */

#include <stdio.h>
#include <webots/led.h>
#include <webots/robot.h>
#include <time.h>
#include <curl/curl.h>

#define TIME_STEP 64
#define N_LIGHT 12

// int http_post_request(const char *url, const char *payload, char **response)
// {
//     CURL *curl;
//     CURLcode res;
//     struct curl_slist *headers = NULL;

//     curl_global_init(CURL_GLOBAL_ALL);
//     curl = curl_easy_init();
//     if (curl)
//     {
//         curl_easy_setopt(curl, CURLOPT_URL, url);
//         headers = curl_slist_append(headers, "Content-Type: application/json");
//         curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
//         curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload);
//         curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, curl_callback);
//         curl_easy_setopt(curl, CURLOPT_WRITEDATA, response);

//         res = curl_easy_perform(curl);
//         curl_slist_free_all(headers);
//         curl_easy_cleanup(curl);
//         if (res != CURLE_OK)
//         {
//             fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
//             return -1;
//         }
//     }
//     else
//     {
//         fprintf(stderr, "Failed to initialize libcurl\n");
//         return -1;
//     }

//     return 0;
// }

// void get_current_datetime(int *current_data)
// {
//     time_t t = time(NULL);
//     struct tm *tm = localtime(&t);
//     current_data[0] = tm->tm_year + 1900; // Year
//     current_data[1] = tm->tm_mon + 1;     // Month
//     current_data[2] = tm->tm_mday;        // Day
//     current_data[3] = tm->tm_hour;        // Hour
//     current_data[4] = tm->tm_wday;        // Weekday (0-6, Sunday to Saturday)
// }

int main(int argc, char **argv)
{
    wb_robot_init();
    WbDeviceTag red_light[N_LIGHT], orange_light[N_LIGHT], green_light[N_LIGHT];

    char red_light_string[32];
    char orange_light_string[32];
    char green_light_string[32];
    int i;

    int current_data[5];
    get_current_datetime(current_data);

    // Format data as needed
    char payload[100];
    sprintf(payload, "{\"option\": \"4\", \"data\": [%d, %d, %d, %d, %d]}",
            current_data[0], current_data[1], current_data[2], current_data[3], current_data[4]);

    char *response;
    if (http_post_request("http://127.0.0.1:5000/", payload, &response) == 0)
    {
        printf("Number of vehicles: %s\n", response);
        no_of_vehicles1 = (int)response[0] - '0';
        free(response);
    }

    // char payload[100];
    sprintf(payload, "{\"option\": \"4\", \"data\": [%d, %d, %d, %d, %d]}",
            current_data[0], current_data[1], current_data[2], current_data[3], current_data[4]);

    int no_of_vehicles1 = 0;
    int no_of_vehicles2 = 0;
    int no_of_vehicles3 = 0;
    int no_of_vehicles4 = 0;
    // char *response;
    if (http_post_request("http://127.0.0.1:5000/", payload, &response) == 0)
    {
        printf("Number of vehicles: %s\n", response);
        no_of_vehicles2 = (int)response[0] - '0';
        free(response);
    }

    sprintf(payload, "{\"option\": \"4\", \"data\": [%d, %d, %d, %d, %d]}",
            current_data[0], current_data[1], current_data[2], current_data[3], current_data[4]);

    // char *response;
    if (http_post_request("http://127.0.0.1:5000/", payload, &response) == 0)
    {
        printf("Number of vehicles: %s\n", response);
        no_of_vehicles3 = (int)response[0] - '0';
        free(response);
    }

    sprintf(payload, "{\"option\": \"4\", \"data\": [%d, %d, %d, %d, %d]}",
            current_data[0], current_data[1], current_data[2], current_data[3], current_data[4]);

    // char *response;
    if (http_post_request("http://127.0.0.1:5000/", payload, &response) == 0)
    {
        printf("Number of vehicles: %s\n", response);
        no_of_vehicles4 = (int)response[0] - '0';
        free(response);
    }
    int average_speed = 12;
    for (i = 0; i < N_LIGHT; i++)
    {
        snprintf(red_light_string, 32, "red light %d", i);
        snprintf(orange_light_string, 32, "orange light %d", i);
        snprintf(green_light_string, 32, "green light %d", i);
        red_light[i] = wb_robot_get_device(red_light_string);
        orange_light[i] = wb_robot_get_device(orange_light_string);
        green_light[i] = wb_robot_get_device(green_light_string);
    }

    int t = 0;
    while (wb_robot_step(TIME_STEP) != -1)
    {
        t += TIME_STEP;
        // Turn on the green lights to go ahead or turn right in the first and third traffic light.
        // Turn on red lights in all others.
        if (t == TIME_STEP)
        {
            wb_led_set(green_light[0], 1);
            wb_led_set(green_light[1], 1);
            wb_led_set(red_light[6], 1);
            wb_led_set(red_light[7], 1);
            wb_led_set(red_light[3], 1);
            wb_led_set(red_light[4], 1);
            wb_led_set(red_light[9], 1);
            wb_led_set(red_light[10], 1);
            // wb_led_set(red_light[2], 1);
            // wb_led_set(red_light[8], 1);
            // wb_led_set(red_light[5], 1);
            // wb_led_set(red_light[11], 1);
        }
        // Turn off green lights and turn on orange lights.
        if (t == no_of_vehicles1 * average_speed * TIME_STEP)
        {
            wb_led_set(green_light[0], 0);
            wb_led_set(green_light[1], 0);
            wb_led_set(red_light[6], 0);
            wb_led_set(red_light[7], 0);
            wb_led_set(orange_light[0], 1);
            wb_led_set(orange_light[1], 1);
            wb_led_set(orange_light[6], 1);
            wb_led_set(orange_light[7], 1);
        }
        // Turn on green lights to go ahead or turn right in second and fourth traffic light.
        // Turn on red lights in all others.
        if (t == 2 * no_of_vehicles1 * average_speed * TIME_STEP)
        {
            wb_led_set(orange_light[0], 0);
            wb_led_set(orange_light[1], 0);
            wb_led_set(red_light[6], 0);
            wb_led_set(red_light[7], 0);
            wb_led_set(red_light[0], 1);
            wb_led_set(red_light[1], 1);
            wb_led_set(red_light[6], 1);
            wb_led_set(red_light[7], 1);
            wb_led_set(red_light[3], 0);
            wb_led_set(red_light[4], 0);
            wb_led_set(red_light[9], 0);
            wb_led_set(red_light[10], 0);
            wb_led_set(green_light[3], 1);
            wb_led_set(green_light[4], 1);
            wb_led_set(red_light[9], 1);
            wb_led_set(red_light[10], 1);
        }
        // Turn off green lights and turn on orange lights.
        if (t == (2 * no_of_vehicles1 + no_of_vehicles2) * average_speed * TIME_STEP)
        {
            wb_led_set(green_light[3], 0);
            wb_led_set(green_light[4], 0);
            wb_led_set(green_light[9], 0);
            wb_led_set(green_light[10], 0);
            wb_led_set(orange_light[3], 1);
            wb_led_set(orange_light[4], 1);
            wb_led_set(red_light[9], 1);
            wb_led_set(red_light[10], 1);
        }
        // Turn on green lights to turn left in first and third traffic light.
        // Turn on red lights in all others.
        if (t == 2 * (no_of_vehicles1 + no_of_vehicles2) * average_speed * TIME_STEP)
        {
            wb_led_set(orange_light[3], 0);
            wb_led_set(orange_light[4], 0);
            wb_led_set(red_light[9], 0);
            wb_led_set(red_light[10], 0);
            wb_led_set(red_light[3], 1);
            wb_led_set(red_light[4], 1);
            wb_led_set(red_light[9], 1);
            wb_led_set(red_light[10], 1);
            wb_led_set(green_light[6], 1);
            wb_led_set(green_light[7], 1);
            // wb_led_set(red_light[2], 0);
            // wb_led_set(red_light[8], 0);
            // wb_led_set(green_light[2], 1);
            // wb_led_set(green_light[8], 1);
        }
        // Turn off green lights and turn on orange lights.
        if (t == (2 * (no_of_vehicles1 + no_of_vehicles2) + no_of_vehicles3) * average_speed * TIME_STEP)
        {
            wb_led_set(green_light[6], 0);
            wb_led_set(green_light[7], 0);
            wb_led_set(orange_light[6], 1);
            wb_led_set(orange_light[7], 1);
        }
        // Turn on green lights to turn left in second and fourth traffic light.
        // Turn on red lights in all others.
        // Turn off orange lights and red light to go ahead and turn right in first and third traffic light and restart.
        if (t == 2 * (no_of_vehicles1 + no_of_vehicles2 + no_of_vehicles3) * average_speed * TIME_STEP)
        {
            wb_led_set(orange_light[6], 0);
            wb_led_set(orange_light[7], 0);
            wb_led_set(green_light[6], 1);
            wb_led_set(green_light[7], 1);
            t = 0; // restart
        }

        if (t == (2 * (no_of_vehicles1 + no_of_vehicles2 + no_of_vehicles3) + no_of_vehicles4) * average_speed * TIME_STEP)
        {
            wb_led_set(red_light[6], 0);
            wb_led_set(red_light[7], 0);

            wb_led_set(green_light[9], 1);
            wb_led_set(green_light[10], 1);
            // wb_led_set(red_light[2], 0);
            // wb_led_set(red_light[8], 0);
            // wb_led_set(green_light[2], 1);
            // wb_led_set(green_light[8], 1);
        }
        if (t == 2 * (no_of_vehicles1 + no_of_vehicles2 + no_of_vehicles3 + no_of_vehicles4) * average_speed * TIME_STEP)
        {
            wb_led_set(green_light[9], 0);
            wb_led_set(green_light[10], 0);

            wb_led_set(orange_light[9], 1);
            wb_led_set(orange_light[10], 1);
            // wb_led_set(red_light[2], 0);
            // wb_led_set(red_light[8], 0);
            // wb_led_set(green_light[2], 1);
            // wb_led_set(green_light[8], 1);
        }
        if (t == ((2 * (no_of_vehicles1 + no_of_vehicles2 + no_of_vehicles3) + no_of_vehicles3) * average_speed * TIME_STEP))
        {
            wb_led_set(orange_light[9], 1);
            wb_led_set(orange_light[10], 1);
            wb_led_set(red_light[9], 1);
            wb_led_set(red_light[10], 1);

            t = 0;
            // wb_led_set(red_light[2], 0);
            // wb_led_set(red_light[8], 0);
            // wb_led_set(green_light[2], 1);
            // wb_led_set(green_light[8], 1);
        }
    }

    wb_robot_cleanup();

    return 0;
}
