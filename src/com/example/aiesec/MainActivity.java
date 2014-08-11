package com.example.aiesec;

import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.*;

public class MainActivity extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
    	super.onCreate(savedInstanceState);
    	super.loadUrl("file:///android_asset/www/Index.html");
    }
}