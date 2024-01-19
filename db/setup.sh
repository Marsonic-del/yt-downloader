psql -f install.sql -U postgres
PGPASSWORD=vova1986 psql -d hollywood -f structure.sql -U vova
