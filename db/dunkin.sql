select DunkinId, AccountNumber, ABARouting, SUM(Amount) from Account, Payment 
WHERE Account.Aid = Payment.source
GROUP BY DunkinId

select DunkinId AccountNumber, ABARouting, SUM(Amount)  from Account, Payment 
WHERE Account.DunkinId = Payment.source
GROUP BY DunkinId