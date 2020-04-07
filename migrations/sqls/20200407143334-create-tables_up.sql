create table categories (id SERIAL PRIMARY KEY,
						 catname varchar(255) UNIQUE NOT NULL,
						 cattype varchar(255),
						 catbrand varchar(255),
						 catsegment varchar(255));
						 
						 
create table products (id SERIAL PRIMARY KEY,
						 productcode varchar(255) UNIQUE NOT NULL,
						 productname varchar(255),
						 description varchar(255),
						 onhand int,
					     volume float,
					     weight float,
					     category_id int NOT NULL REFERENCES categories(id));