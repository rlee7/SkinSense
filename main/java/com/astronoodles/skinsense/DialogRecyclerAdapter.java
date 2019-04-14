package com.astronoodles.skinsense;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class DialogRecyclerAdapter extends RecyclerView.Adapter<DialogRecyclerAdapter.ViewHolder> {


    private ArrayList<CancerList> cancerProbsList;

    public DialogRecyclerAdapter(ArrayList<CancerList> list){
        list = cancerProbsList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.dialog_recycler, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        final CancerList nameProb = cancerProbsList.get(position);
        holder.cancer_name.setText(nameProb.getCancerName());
        holder.prediction.setText(nameProb.getProbability());
    }

    @Override
    public int getItemCount() {
        return cancerProbsList.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
    private TextView cancer_name;
    private TextView prediction;

    public ViewHolder(View v){
        super(v);

        cancer_name = v.findViewById(R.id.skin_cancer_name);
        prediction = v.findViewById(R.id.probability);
    }


}

}


