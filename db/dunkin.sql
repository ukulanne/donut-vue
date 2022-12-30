
select DunkinId, AccountNumber, ABARouting, SUM(Amount) as TOTAL  from Account, Payment 
                WHERE Account.Aid = Payment.source
                GROUP BY DunkinId
                
select count (DunkinBranch) from Employee  

select branch, paymentTS as DATE, SUM(AMOUNT) as TOTAL from Payment group by branch 