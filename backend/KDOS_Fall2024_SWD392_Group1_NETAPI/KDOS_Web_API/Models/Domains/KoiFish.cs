using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.Domains
{
    public class KoiFish
    {
        [Key]
        public int KoiFishId { get; set; }
        required public string FishType { get; set; }
        required public string Description { get; set; }
        public ICollection<FishProfile>? FishProfile { get; set; }
    }
}

