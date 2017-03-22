package io.masse.parityleaguestats.model;

import java.util.ArrayList;

public class Team {
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

    public void addPlayer(String teamMember, Boolean isMale){
        if (isMale){
            arlGuys.add(teamMember);
        }else{
            arlGirls.add(teamMember);
        }
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
