package be.decock.steven.leerplatform.domain;

import java.util.Date;

public class TestScore {
    
    private int score;
    private Date date;

    public TestScore() {
    }
    
    public TestScore(int score, Date date) {
        this.score = score;
        this.date = date;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
}
