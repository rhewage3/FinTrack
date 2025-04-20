using FinTrack.Api.Models;

namespace FinTrack.Api.Data
{
    public class DbSeeder
    {
        public static void SeedCategories(AppDbContext context)
        {
            if (context.Categories.Any()) return;

            var categories = new List<Category>();

            // Expense Parent Categories with Subcategories
            var expenseCategories = new Dictionary<string, (string type, string[] subs)>
            {
                ["Food and Drinks"] = ("expense", new[] { "Bar", "Cafe", "Groceries", "Restaurant", "Fast Food" }),
                ["Shopping"] = ("expense", new[] {
                    "Clothes & Shoes", "Drug Store - Chemist", "Electronics - Accessories", "Free Time",
                    "Gifts - Joy", "Health and Beauty", "Home and Garden", "Jewels",
                    "Kids", "Pets and Animals", "Stationary and Tools"
                }),
                ["Housing"] = ("expense", new[] {
                    "Energy - Utilities", "Maintenance and Repairs", "Mortgage",
                    "Property Insurance", "Rent", "Service"
                }),
                ["Transportation"] = ("expense", new[] {
                    "Business Trips", "Long Distance", "Public Transport", "Taxi"
                }),
                ["Vehicle"] = ("expense", new[] {
                    "Fuel", "Leasing", "Parking", "Rentals",
                    "Vehicle Insurance", "Vehicle Maintenance"
                }),
                ["Life and Entertainment"] = ("expense", new[] {
                    "Active Sport - Fitness", "Alcohol - Tobacco", "Books - Audio - Subscriptions",
                    "Charity - Gifts", "Culture - Sports Events", "Education - Development",
                    "Healthcare - Doctor", "Hobbies", "Holiday - Trips - Hotels",
                    "Life Events", "Lottery - Gambling", "TV - Streaming", "Wellness - Beauty"
                }),
                ["Communication and PC"] = ("expense", new[] {
                    "Internet", "Phone - Cellphone", "Postal Service", "Software - Apps - Games"
                }),
                ["Financial Expenses"] = ("expense", new[] {
                    "Advisory", "Charges - Fees", "Child Support", "Fines",
                    "Insurance", "Loan - Interest", "Taxes"
                }),
                ["Investments"] = ("expense", new[] {
                    "Collections", "Financial Investments", "Realty", "Savings", "Vehicle - Chattels"
                }),
                ["Others"] = ("expense", Array.Empty<string>())
            };

            // Income Categories
            var incomeCategories = new Dictionary<string, string[]>
            {
                ["Income"] = new[] {
                    "Checks - Coupons", "Child Support", "Dues and Grants", "Gifts",
                    "Interests and Dividends", "Lending and Renting", "Lottery and Gambling",
                    "Refunds", "Rental Income", "Sale", "Wage and Invoices"
                }
            };

            // Insert expense categories
            foreach (var (parentName, (type, subs)) in expenseCategories)
            {
                var parent = new Category { Name = parentName, Type = type };
                context.Categories.Add(parent);
                context.SaveChanges(); // Get parent ID

                foreach (var sub in subs)
                {
                    context.Categories.Add(new Category
                    {
                        Name = sub,
                        Type = type,
                        ParentId = parent.Id
                    });
                }

                context.SaveChanges();
            }

            // Insert income categories
            foreach (var (parentName, subs) in incomeCategories)
            {
                var parent = new Category { Name = parentName, Type = "income" };
                context.Categories.Add(parent);
                context.SaveChanges();

                foreach (var sub in subs)
                {
                    context.Categories.Add(new Category
                    {
                        Name = sub,
                        Type = "income",
                        ParentId = parent.Id
                    });
                }

                context.SaveChanges();
            }
        }
    }
}
