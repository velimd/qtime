package com.duzgunce.veli.qtime;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void SendID(View view) {
        Intent getID = new Intent(this, AnswerScreen.class);

        EditText ID = (EditText) findViewById(R.id.id_value);
        String questionID = String.valueOf(ID.getText());
        getID.putExtra("ID", questionID);
        startActivity(getID);
    }
    public void QSendID(View view) {
        Intent getID = new Intent(this, quizanswer.class);

        EditText ID = (EditText) findViewById(R.id.id_value);
        String questionID = String.valueOf(ID.getText());
        getID.putExtra("ID", questionID);
        startActivity(getID);
    }
}
