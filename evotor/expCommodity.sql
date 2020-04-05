SELECT ex.uuid, ex.[group], hasVariant = null, ex.[type], ex.name, ex.code,
        ex.barCodes, ex.price, ex.costPrice, ex.quantity, ex.measureName,
        ex.tax, ex.allowToSell, ex.description, ex.articleNumber, ex.parentUuid
FROM qryExPrice AS ex INNER JOIN tblExTemp 
ON ex.code = tblExTemp.Code 
WHERE (((tblExTemp.[Check]) = True)) 
ORDER BY ex.code;