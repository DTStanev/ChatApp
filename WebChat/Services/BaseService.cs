using Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public abstract class BaseService
    {
        protected readonly ChatAppDbContext db;

        protected BaseService(ChatAppDbContext db)
        {
            this.db = db;
        }
    }
}
