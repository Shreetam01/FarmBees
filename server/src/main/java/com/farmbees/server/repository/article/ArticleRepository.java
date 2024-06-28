package com.farmbees.server.repository.article;

import com.farmbees.server.model.article.ArticleResponse;
import com.farmbees.server.model.article.SingleArticleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public class ArticleRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ArticleRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean insertNewArticle(int eid, String title, String fullArticle, String imageData){
        String queryToInsertArticle = "INSERT INTO ARTICLE(EID, TITLE, FULL_ARTICLE, IMAGE_DATA) VALUES(?,?,?,?)";
        int updated = jdbcTemplate.update(queryToInsertArticle, eid, title, fullArticle, imageData);
        return updated != 0;
    }

    public boolean articlePresent(int id){
        String queryToGetCount = "SELECT COUNT(*) FROM ARTICLE WHERE ID = ?";
        Integer count = jdbcTemplate.queryForObject(queryToGetCount, Integer.class, id);
        return !Objects.equals(count, 0);
    }

    public List<ArticleResponse> getAllArticles(){
        String queryToGetArticles = "SELECT ID, TITLE, FULL_ARTICLE, IMAGE_DATA FROM ARTICLE";
        return jdbcTemplate.query(queryToGetArticles, (rs, rowNum) -> {
            ArticleResponse articleResponse = new ArticleResponse();

            articleResponse.setId(rs.getInt("ID"));
            articleResponse.setTitle(rs.getString("TITLE"));
            articleResponse.setInitialLine(rs.getString("FULL_ARTICLE"));
            articleResponse.setImageData(rs.getString("IMAGE_DATA"));

            return articleResponse;
        });
    }

    public SingleArticleResponse getArticleById(int id){
        String queryToGetArticle = "SELECT A.ID, A.TITLE, A.FULL_ARTICLE, A.IMAGE_DATA, A.DATE, "
                + "E.NAME AS AUTHOR "
                + "FROM ARTICLE A "
                + "JOIN EXPERT E "
                + "ON A.EID = E.ID "
                + "WHERE A.ID = ?";

        return jdbcTemplate.queryForObject(queryToGetArticle, (rs, rowNum) -> {
            SingleArticleResponse articleResponse = new SingleArticleResponse();

            articleResponse.setId(rs.getInt("ID"));
            articleResponse.setTitle(rs.getString("TITLE"));
            articleResponse.setFullArticle(rs.getString("FULL_ARTICLE"));
            articleResponse.setImageData(rs.getString("IMAGE_DATA"));
            articleResponse.setDate(rs.getString("DATE"));
            articleResponse.setAuthor(rs.getString("AUTHOR"));

            return articleResponse;

        }, id);
    }

}
