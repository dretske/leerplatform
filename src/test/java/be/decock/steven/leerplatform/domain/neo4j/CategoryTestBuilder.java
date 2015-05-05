package be.decock.steven.leerplatform.domain.neo4j;

public class CategoryTestBuilder {
    
    private String name = "defaultCategoryName";
    private String title = "defaultCategoryTitle";
    private String imagePath = "defaultCategoryImagePath";
    private LearningActivity startActivity = null;
    
    private CategoryTestBuilder() {
    }
    
    public static CategoryTestBuilder aCategory() {
        return new CategoryTestBuilder();
    }
    
    public Category build() {
        final Category category = new Category();
        
        category.setName(this.name);
        category.setTitle(this.title);
        category.setImagePath(this.imagePath);
        category.setStartActivity(this.startActivity);
        
        return category;
    }
    
    public CategoryTestBuilder withName(String name) {
        this.name = name;
        return this;
    }
    
    public CategoryTestBuilder withTitle(String title) {
        this.title = title;
        return this;
    }
    
    public CategoryTestBuilder withImagePath(String imagePath) {
        this.imagePath = imagePath;
        return this;
    }

    public CategoryTestBuilder withStartActivity(LearningActivity startActivity) {
        this.startActivity = startActivity;
        return this;
    }
    
}
