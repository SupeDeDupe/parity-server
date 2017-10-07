package io.masse.parityleaguestats.model;

import java.util.ArrayList;
import java.io.Serializable;

public class Team implements Serializable {
    public String name = "";
    public ArrayList<String> arlGuys = new ArrayList<>();
    public ArrayList<String> arlGirls = new ArrayList<>();

    public Team(String teamName, String teamMember, Boolean isMale){
        name = teamName;
        if (isMale){
            arlGuys.add(teamMember);
        }else{
            arlGirls.add(teamMember);
        }
    }

    public void addPlayer(String playerName, Gender gender){
        boolean isMale = (gender == Gender.Male);
        addPlayer(playerName, isMale);
    }

    public void addPlayer(String playerName, Boolean isMale){
        if (isMale){
            arlGuys.add(playerName);
        }else{
            arlGirls.add(playerName);
        }
    }

    public void removePlayer(String playerName) {

    }

    public ArrayList<String> getPlayers(){
        ArrayList<String> names = new ArrayList<>();

        for (int i = 0; i < sizeGirls(); i++){
            names.add(arlGirls.get(i));
        }

        for (int i = 0; i < sizeGuys(); i++){
            names.add(arlGuys.get(i));
        }

        return names;
    }

    public int sizeGuys(){
        return arlGuys.size();
    }

    public int sizeGirls() {
        return arlGirls.size();
    }

    public String getGuyName(int playerNumber){
        return arlGuys.get(playerNumber);
    }

    public String getGirlName(int playerNumber){
        return arlGirls.get(playerNumber);
    }
}
