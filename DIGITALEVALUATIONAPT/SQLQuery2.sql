select * from colleges;

UPDATE cc_user.Colleges
SET IsDeleted = 0
WHERE CollegeId IN (1,2,3,4);