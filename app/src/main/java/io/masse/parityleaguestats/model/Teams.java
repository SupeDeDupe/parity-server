package io.masse.parityleaguestats.model;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;

class TeamsLoadError extends RuntimeException {
    public TeamsLoadError(String msg) {
        super(msg);
    }
}

public class Teams implements Serializable {
    private ArrayList<Team> teamsArray = new ArrayList<>();

    // Roster Schema:
    // https://parity-server.herokuapp.com/docs/#api-Teams-GetTeams
    public void load(JSONObject json) {
        try {
            Iterator<String> iter = json.keys();

            while(iter.hasNext()) {
                String teamName = iter.next();
                JSONObject teamObject = json.getJSONObject(teamName);
                JSONArray malePlayers = teamObject.getJSONArray("malePlayers");
                JSONArray femalePlayers = teamObject.getJSONArray("femalePlayers");

                for( int i = 0; i < malePlayers.length(); i++) {
                    addPlayer(teamName, malePlayers.getString(i), true);
                }

                for( int i = 0; i < femalePlayers.length(); i++) {
                    addPlayer(teamName, femalePlayers.getString(i), false);
                }
            }

        } catch (Exception e) {
            throw new TeamsLoadError(e.getMessage());
        }
    }

    private void addPlayer(String teamName, String playerName, Boolean isMale) {
        if (teamsArray.isEmpty()) {
            teamsArray.add(new Team(teamName, playerName, isMale));
        } else {
            boolean match = false;

            for (Team team: teamsArray) {
                if (team.name.equals(teamName)){
                    match = true;
                    team.addPlayer(playerName, isMale);
                    break;
                }
            }

            if (!match){
                teamsArray.add(new Team(teamName, playerName, isMale));
            }
        }
    }

    public ArrayList<String> allPlayers() {
        ArrayList<String> names = new ArrayList<>();

        for (int i = 0; i < teamsArray.size(); i++) {
            names.addAll(teamsArray.get(i).getPlayers());
        }

        return names;
    }

    public Team getTeam(int teamNumber) {
        return teamsArray.get(teamNumber);
    }

    public Gender getPlayerGender(String playerName) {
        for (Team team : teamsArray) {
            if (team.arlGirls.contains(playerName)) {
                return Gender.Female;
            } else if (team.arlGuys.contains(playerName)) {
                return Gender.Male;
            }
        }

        return Gender.Unknown;
    }

    public String[] getNames() {
        String[] teamNames;
        int counter = 0;
        int intTeamSize = teamsArray.size();

        if (substituteExists()){
            teamNames = new String[teamsArray.size()-1];
        } else {
            teamNames = new String[teamsArray.size()];
        }

        for (int i = 0; i < intTeamSize; i++) {
            if (!teamsArray.get(i).name.equals("Substitute")){
                teamNames[counter] = teamsArray.get(i).name;
                counter++;
            }
        }

        return teamNames;
    }

    private boolean substituteExists() {
        int intTeamSize = teamsArray.size();
        for (int i = 0; i < intTeamSize; i++){
            if (teamsArray.get(i).name.equals("Substitute")){
                return true;
            }
        }
        return false;
    }
}
