---
title: Finally, Backend
date: 2026-10-04
---
I finally found a course that fits me: a Russian-language [Spring course](https://youtu.be/FyZFK4LBjj0) from Gosha Dudar's YouTube channel. It's six years old and partly outdated, but with Claude's help I filled in the gaps. The author explains things cleanly, with no filler and no pointless tangents. Huge thanks to him for that.

**Stack:** Spring, HTML, Bootstrap (the author didn't want to bother with CSS), Docker + MySQL.

The project is a simple blog: posts with a title, text, a view counter, and "More", "Edit" and "Delete" buttons. Along the way the course shows how requests are created and handled.

## Impressions

Backend used to be pure magic to me. Now it's a little less so.

You don't need deep Java knowledge for this course, but without OOP experience you'll get lost. Luckily, I have it. Honestly, I don't know why I was messing around with Go when I could have just used Java.

The biggest surprise was fragments: you can take a piece of HTML and insert it into other pages. A header with all its links is written once instead of on every page. Cleaner code, less hassle.

## What I had to fix

**1. Dependencies.** The author copies them from spring.io/guides into `pom.xml` by hand. In IntelliJ IDEA you just pick them in the **Add Starters** menu (Spring Web, Spring Data JPA, MySQL Driver, Thymeleaf). Note: in Spring Boot 4, Spring Web is now called **Spring Web MVC** (`spring-boot-starter-webmvc`).

**2. MAMP → Docker.** The author uses MAMP and warns it can misbehave on Windows. MAMP bundles Apache, MySQL and PHP, but I only needed MySQL, so I ran it in a container via `docker-compose.yml`. Instead of phpMyAdmin I used IntelliJ's built-in Database panel to view tables and run queries.

**3. MySQL driver.** The old `mysql:mysql-connector-java` no longer works. The new one:

```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

The `application.properties` snippet is gone from spring.io/guides too. This works:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/blog
spring.datasource.username=username
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

The dialect, driver class name and `?serverTimezone=UTC` from the course are no longer needed. Spring Boot handles them itself.

**4. `javax` → `jakarta`.** Since Spring Boot 3, `javax.persistence` is `jakarta.persistence` (same for `javax.validation`). If old course code doesn't compile, check this first.
