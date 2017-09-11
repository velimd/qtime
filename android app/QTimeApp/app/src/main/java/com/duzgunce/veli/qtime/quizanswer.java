package com.duzgunce.veli.qtime;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by Veli on 14/04/2017.
 */

public class quizanswer extends AppCompatActivity {
    String ID;
    String questionID;
    String answer;
    String oldquestion;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.answer_layout);

        Intent activityCalled = getIntent();
        ID = activityCalled.getExtras().getString("ID");


        final Handler handler = new Handler();
        Timer timer = new Timer();
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                handler.post(new Runnable() {
                    public void run() {
                        try {
                            new quizanswer.SessionRequest().execute();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                });
            }
        }; timer.schedule(task, 0, 2*1000);
    }

    public void onClick(View v){
        switch (v.getId()){
            case R.id.button_ans1:
                answer="answer1";
                new quizanswer.QuizAnswerRequest().execute();
                break;
            case R.id.button_ans2:
                answer="answer2";
                new quizanswer.QuizAnswerRequest().execute();
                break;
            case R.id.button_ans3:
                answer="answer3";
                new quizanswer.QuizAnswerRequest().execute();
                break;
            case R.id.button_ans4:
                answer="answer4";
                new quizanswer.QuizAnswerRequest().execute();
                break;
        }
    }

    private class SessionRequest extends AsyncTask<Void, Void, String> {
        protected String doInBackground(Void... params){
            try {
                URL url = new URL("https://qtimeweb.herokuapp.com/api/session/"+ID);
                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                try{
                    InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                    BufferedReader br = new BufferedReader(new InputStreamReader(in));
                    StringBuilder stringBuilder = new StringBuilder();
                    String line;
                    while((line=br.readLine())!=null){
                        stringBuilder.append(line).append("\n");
                    }
                    br.close();
                    return  stringBuilder.toString();
                }
                finally {
                    urlConnection.disconnect();
                }
            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }
        protected  void onPostExecute(String response){
            if(response!=null){
                try {
                    JSONObject json = new JSONObject(response);

                    questionID=json.getString("question");

                    if(!questionID.equals(oldquestion)){
                        Button answer1 = (Button) findViewById(R.id.button_ans1);
                        answer1.setClickable(true);
                        Button answer2 = (Button) findViewById(R.id.button_ans2);
                        answer2.setClickable(true);
                        Button answer3 = (Button) findViewById(R.id.button_ans3);
                        answer3.setClickable(true);
                        Button answer4 = (Button) findViewById(R.id.button_ans4);
                        answer4.setClickable(true);
                    }

                    new quizanswer.QuestionRequest().execute();

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private class QuestionRequest extends AsyncTask<Void, Void, String> {
        protected String doInBackground(Void... params){
            try {
                URL url = new URL("https://qtimeweb.herokuapp.com/api/polls/"+questionID);
                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                try{
                    InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                    BufferedReader br = new BufferedReader(new InputStreamReader(in));
                    StringBuilder stringBuilder = new StringBuilder();
                    String line;
                    while((line=br.readLine())!=null){
                        stringBuilder.append(line).append("\n");
                    }
                    br.close();
                    return  stringBuilder.toString();
                }
                finally {
                    urlConnection.disconnect();
                }
            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }
        protected  void onPostExecute(String response){
            if(response!=null){
                try {
                    JSONObject json = new JSONObject(response);

                    TextView displayID = (TextView)findViewById(R.id.textView_id);
                    displayID.setText(json.getString("Question"));

                    Button answer1 = (Button)findViewById(R.id.button_ans1);
                    answer1.setText(json.getString("Answer1"));

                    Button answer2 = (Button)findViewById(R.id.button_ans2);
                    answer2.setText(json.getString("Answer2"));

                    Button answer3 = (Button)findViewById(R.id.button_ans3);
                    answer3.setText(json.getString("Answer3"));

                    Button answer4 = (Button)findViewById(R.id.button_ans4);
                    answer4.setText(json.getString("Answer4"));

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private class QuizAnswerRequest extends AsyncTask<Void, Void, String> {
        protected String doInBackground(Void... params){
            try {
                URL url = new URL("https://qtimeweb.herokuapp.com/api/"+answer+"/"+questionID);
                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                try{
                    urlConnection.setDoOutput(true);
                    urlConnection.setRequestMethod("PUT");
                    urlConnection.setRequestProperty("Content-Type", "application/json");

                    OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
                    out.write(answer);
                    urlConnection.getInputStream();
                }
                finally {
                    urlConnection.disconnect();
                }
            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return "Request Sent";
        }
        protected  void onPostExecute(String response){
            Button answer1 = (Button)findViewById(R.id.button_ans1);
            answer1.setClickable(false);
            Button answer2 = (Button)findViewById(R.id.button_ans2);
            answer2.setClickable(false);
            Button answer3 = (Button)findViewById(R.id.button_ans3);
            answer3.setClickable(false);
            Button answer4 = (Button)findViewById(R.id.button_ans4);
            answer4.setClickable(false);

            oldquestion=questionID;
        }
    }
}
