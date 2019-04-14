package com.astronoodles.skinsense;


import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.core.content.FileProvider;
import androidx.fragment.app.Fragment;

import android.os.Environment;
import android.provider.MediaStore;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;


/**
 * A simple {@link Fragment} subclass.
 */
public class CameraFragment extends Fragment {

    public ImageView skinImage;
    public Button sendAzure;
    public ProgressBar progressBar;

    public static final String AZURE_URL = "https://cs2340e2e4585b8x4d5bxa10.blob.core.windows.net/pictures";

    public CameraFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_camera, container, false);
        skinImage = v.findViewById(R.id.camera_img);
        ImageButton cameraPic = v.findViewById(R.id.picture_button);
        sendAzure = v.findViewById(R.id.send_azure);
        progressBar = v.findViewById(R.id.progressBar);

        cameraPic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                File file = getFileForImage();
                if (file.exists()) {
                    try (FileInputStream fis = new FileInputStream(file)) {
                        Bitmap b = BitmapFactory.decodeStream(fis);
                        skinImage.setImageBitmap(b);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                } else {
                    Intent i = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                    if (i.resolveActivity(getActivity().getPackageManager()) != null) {
                        startActivityForResult(i, 1);
                    }
                }
            }
        });

        sendAzure.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                 TODO Use Android Volley to communicate with the keys in azure and understand the JSON response that you get
//                 TODO make a message for the disease and links to treat it
//                 TODO make a toast if there is no disease found
                RequestQueue queue = Volley.newRequestQueue(getActivity());
                JsonObjectRequest req = new JsonObjectRequest(Request.Method.GET, AZURE_URL, null, new Response.Listener<JSONObject> () {
                    @Override
                    public void onResponse(JSONObject obj){
                        // TODO get the json array of probabilities out of the array and place them in the top three spots
                        // TODO the responses get a
                        progressBar.setVisibility(View.INVISIBLE);


                    }
                }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error){
                            Toast.makeText(getActivity(), "Cannot connect to the server. Do you have Internet?", Toast.LENGTH_LONG).show();
                        }
                });
                queue.add(req);
            }
        });


        return v;
    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == 1 && resultCode == Activity.RESULT_OK) {
            Bundle extras = data.getExtras();
            Bitmap bitmap = (Bitmap) extras.get("data");
            skinImage.setImageBitmap(bitmap);

            try(FileOutputStream fos = new FileOutputStream(getFileForImage())){
                bitmap.compress(Bitmap.CompressFormat.JPEG, 90, fos);
            } catch(IOException e){
                e.printStackTrace();
            }
        }
    }

    private File getFileForImage(){
        String picDir = Environment.getExternalStorageDirectory().toString();
        File myDir = new File(picDir, "saved_images");
        myDir.mkdirs();
        String bitmapName = String.format("JPEG_%s.jpg", SimpleDateFormat.getDateInstance().toString());
        return new File(myDir, bitmapName);
    }

}
