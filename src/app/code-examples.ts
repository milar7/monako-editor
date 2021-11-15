export class CodeExamples {
  public static cSharpCode = `
/*
* C# Program to Display All the Prime Numbers Between 1 to 100
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace VS
{
	class Program
	{
		static void Main(string[] args)
		{
			bool isPrime = true;
			Console.WriteLine("Prime Numbers : ");
			for (int i = 2; i <= 100; i++)
			{
				for (int j = 2; j <= 100; j++)
				{
					if (i != j && i % j == 0)
					{
						isPrime = false;
						break;
					}
				}

				if (isPrime)
				{
					Console.Write("\t" +i);
				}
				isPrime = true;
			}
			Console.ReadKey();
		}
	}
}

  `;
  public static sqlCode = `
  CREATE TABLE dbo.EmployeePhoto
(
    EmployeeId INT NOT NULL PRIMARY KEY,
    Photo VARBINARY(MAX) FILESTREAM NULL,
    MyRowGuidColumn UNIQUEIDENTIFIER NOT NULL ROWGUIDCOL
                    UNIQUE DEFAULT NEWID()
);

GO

/*
text_of_comment
/* nested comment */
*/

-- line comment

CREATE NONCLUSTERED INDEX IX_WorkOrder_ProductID
    ON Production.WorkOrder(ProductID)
    WITH (FILLFACTOR = 80,
        PAD_INDEX = ON,
        DROP_EXISTING = ON);
GO

WHILE (SELECT AVG(ListPrice) FROM Production.Product) < $300
BEGIN
   UPDATE Production.Product
      SET ListPrice = ListPrice * 2
   SELECT MAX(ListPrice) FROM Production.Product
   IF (SELECT MAX(ListPrice) FROM Production.Product) > $500
      BREAK
   ELSE
      CONTINUE
END
PRINT 'Too much for the market to bear';

MERGE INTO Sales.SalesReason AS [Target]
USING (VALUES ('Recommendation','Other'), ('Review', 'Marketing'), ('Internet', 'Promotion'))
       AS [Source] ([NewName], NewReasonType)
ON [Target].[Name] = [Source].[NewName]
WHEN MATCHED
THEN UPDATE SET ReasonType = [Source].NewReasonType
WHEN NOT MATCHED BY TARGET
THEN INSERT ([Name], ReasonType) VALUES ([NewName], NewReasonType)
OUTPUT $action INTO @SummaryOfChanges;

SELECT ProductID, OrderQty, SUM(LineTotal) AS Total
FROM Sales.SalesOrderDetail
WHERE UnitPrice < $5.00
GROUP BY ProductID, OrderQty
ORDER BY ProductID, OrderQty
OPTION (HASH GROUP, FAST 10);

  `;
  public static pyCode = `
import banana

class Monkey:
    # Bananas the monkey can eat.
    capacity = 10
    def eat(self, n):
        """Make the monkey eat n bananas!"""
        self.capacity -= n * banana.size

    def feeding_frenzy(self):
        self.eat(9.25)
        return "Yum yum"

  `;
  public static matlabCode = `

% Input vector
values = [12, 4, 8.9, 6, 3];

% function return mean of vector c
function m = stat(x)
    n = length(x);
    m = sum(x)/n;
end

mean = stat(values)
  `;
  public static rCode = `
  # © Microsoft. All rights reserved.

#' Add together two numbers.
#'
#' @param x A number.
#' @param y A number.
#' @return The sum of \\code{x} and \\code{y}.
#' @examples
#' add(1, 1)
#' add(10, 1)
add <- function(x, y) {
  x + y
}

add(1, 2)
add(1.0, 2.0)
add(-1, -2)
add(-1.0, -2.0)
add(1.0e10, 2.0e10)


#' Concatenate together two strings.
#'
#' @param x A string.
#' @param y A string.
#' @return The concatenated string built of \\code{x} and \\code{y}.
#' @examples
#' strcat("one", "two")
strcat <- function(x, y) {
  paste(x, y)
}

paste("one", "two")
paste('one', 'two')
paste(NULL, NULL)
paste(NA, NA)

paste("multi-
      line",
      'multi-
      line')

  `;
}
