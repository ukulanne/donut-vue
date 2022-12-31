--Total paid per Dunkin Bank Account
select DunkinId, AccountNumber, ABARouting, SUM(Amount) as TOTAL  from Account, Payment 
                WHERE Account.Aid = Payment.source
                GROUP BY DunkinId
                
 
--Total amount paid per branch
select branch, paymentTS as DATE, SUM(AMOUNT) as TOTAL from Payment group by branch 

--List of Employees with total paid to their student loan accounts
select FirstName, LastName, DunkinId, DOB, DunkinBranch, SUM(AMOUNT) as TOTAL 
from Employee, Payment, studentloan 
where employee.eid = studentloan.holderid and studentloan.id= payment.destination
group by dunkinid
limit 300

--List of unique pay periods
select distinct paymentTS from Payment

--List of unique Dunkin Branches
select distinct DunkinBranch from Employee

select DunkinId, AccountNumber, ABARouting, SUM(Amount) as TOTAL  from Account, Payment
WHERE Account.Aid = Payment.source AND paymentTS in ('2022-12-30') GROUP BY DunkinId

