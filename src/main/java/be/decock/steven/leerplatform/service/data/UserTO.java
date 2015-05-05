package be.decock.steven.leerplatform.service.data;

public class UserTO extends TransferObject {
    
    public Long id;
    public String name;
    public Iterable<ScoreTO> maxScores;
    
}
