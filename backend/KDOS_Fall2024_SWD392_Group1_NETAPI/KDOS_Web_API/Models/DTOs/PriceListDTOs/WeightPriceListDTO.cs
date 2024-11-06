namespace KDOS_Web_API.Models.DTOs
{
    public class WeightPriceListDTO
    {
        public int WeightPriceListId { get; set; }
        required public float MinRange { get; set; }
        required public float MaxRange { get; set; }
        required public float Price { get; set; }
    }
}
