package com.duzgunce.veli.qtime;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by Veli on 16/03/2017.
 */

public class AnswerScreen extends AppCompatActivity {
    String ID;
    String answer;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.answer_layout);

        Intent activityCalled = getIntent();
        ID = activityCalled.getExtras().getString("ID");

        new QuestionRequest().execute();
    }

    public void onClick(View v){
        switch (v.getId()){
            case R.id.button_ans1:
                answer="answer1";
                new AnswerRequest().execute();
                break;
            case R.id.button_ans2:
                answer="answer2";
                new AnswerRequest().execute();
                break;
            case R.id.button_ans3:
                answer="answer3";
                new AnswerRequest().execute();
                break;
            case R.id.button_ans4:
                answer="answer4";
                new AnswerRequest().execute();
                break;
        }
    }

    private class QuestionRequest extends AsyncTask<Void, Void, String> {
        protected String doInBackground(Void... params){
            try {
                URL url = new URL("https://qtimeweb.herokuapp.com/api/polls/"+ID);
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

    private class AnswerRequest extends AsyncTask<Void, Void, String> {
        protected String doInBackground(Void... params){
            try {
                URL url = new URL("https://qtimeweb.herokuapp.com/api/"+answer+"/"+ID);
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
        }
    }
}
