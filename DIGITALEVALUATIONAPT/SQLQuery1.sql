select * from Students;
select * from Branches;
select * from Courses;
select * from Colleges;
select * from Subjects;
select * from AspNetUserRoles
select * from MenuMasters
select * from rolemenumappings


INSERT INTO RoleMenuMappings (RoleId, MenuId, CanView)
SELECT r.RoleId, m.MenuId, 1
FROM (VALUES 
    ('e8bc27a1-15c8-4624-9e2b-f3f83cbadd94'),
    ('f7cbf085-d98f-45c6-adcb-84f565b087ec')
) AS r(RoleId)
CROSS JOIN MenuMasters m
WHERE NOT EXISTS (
    SELECT 1 
    FROM RoleMenuMappings rm
    WHERE rm.RoleId = r.RoleId
    AND rm.MenuId = m.MenuId
);

update Branches
set IsDeleted = 0
where BranchId = 1

update Students
set IsDeleted = 0
where IsDeleted = 1;


UPDATE MenuMasters SET MenuUrl = '/dashboard' WHERE MenuName = 'Dashboard';
UPDATE MenuMasters SET MenuUrl = '/colleges' WHERE MenuName = 'Colleges';
UPDATE MenuMasters SET MenuUrl = '/students' WHERE MenuName = 'Students';
UPDATE MenuMasters SET MenuUrl = '/subjects' WHERE MenuName = 'Subjects';
UPDATE MenuMasters SET MenuUrl = '/branches' WHERE MenuName = 'Branches';
UPDATE MenuMasters SET MenuUrl = '/courses' WHERE MenuName = 'Courses';

INSERT INTO MenuMasters (MenuName, MenuUrl, OrderNo, IsActive)
VALUES 
('Subjects', '/subjects', 4, 1),
('Branches', '/branches', 5, 1),
('Courses', '/courses', 6, 1);


INSERT INTO RoleMenuMappings (RoleId, MenuId, CanView)
SELECT r.RoleId, m.MenuId, 1
FROM (VALUES 
    ('e8bc27a1-15c8-4624-9e2b-f3f83cbadd94'),
    ('f7cbf085-d98f-45c6-adcb-84f565b087ec')
) AS r(RoleId)
CROSS JOIN MenuMasters m
WHERE NOT EXISTS (
    SELECT 1 
    FROM RoleMenuMappings rm
    WHERE rm.RoleId = r.RoleId
    AND rm.MenuId = m.MenuId
);


UPDATE MenuMasters SET Icon = '🏠' WHERE MenuName = 'Dashboard';
UPDATE MenuMasters SET Icon = '🏫' WHERE MenuName = 'Colleges';
UPDATE MenuMasters SET Icon = '🎓' WHERE MenuName = 'Students';
UPDATE MenuMasters SET Icon = '📘' WHERE MenuName = 'Subjects';
UPDATE MenuMasters SET Icon = '🌿' WHERE MenuName = 'Branches';
UPDATE MenuMasters SET Icon = '📚' WHERE MenuName = 'Courses';


ALTER TABLE MenuMasters
ALTER COLUMN Icon NVARCHAR(50);

UPDATE MenuMasters SET Icon = N'🏠' WHERE MenuName = 'Dashboard';
UPDATE MenuMasters SET Icon = N'🏫' WHERE MenuName = 'Colleges';
UPDATE MenuMasters SET Icon = N'🎓' WHERE MenuName = 'Students';
UPDATE MenuMasters SET Icon = N'📘' WHERE MenuName = 'Subjects';
UPDATE MenuMasters SET Icon = N'🌿' WHERE MenuName = 'Branches';
UPDATE MenuMasters SET Icon = N'📚' WHERE MenuName = 'Courses';